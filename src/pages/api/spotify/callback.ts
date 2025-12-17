import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/runtime-env";

export const GET: APIRoute = async ({ locals, url, cookies }) => {
  // Optional setup protection: require ?key= to match SPOTIFY_SETUP_KEY if it exists
  const setupKey = (locals.runtime.env as any)?.SPOTIFY_SETUP_KEY as string | undefined;
  if (setupKey) {
    const key = url.searchParams.get("key");
    if (!key || key !== setupKey) {
      return new Response("Forbidden: invalid or missing setup key", { status: 403 });
    }
  }
  const error = url.searchParams.get("error");
  if (error) return new Response(`Spotify error: ${error}`, { status: 400 });

  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing ?code=", { status: 400 });

  const verifier = cookies.get("spotify_pkce_verifier")?.value;
  if (!verifier) return new Response("Missing PKCE verifier cookie", { status: 400 });

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } = getEnv(locals);

  const basic = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      code_verifier: verifier,
    }),
  });

  const tokenJson = await tokenRes.json<{refresh_token: string}>();

  if (!tokenRes.ok) {
    return new Response(`Token exchange failed:\n${JSON.stringify(tokenJson, null, 2)}`, { status: 500 });
  }

  return new Response(
    `Copy this refresh token into SPOTIFY_REFRESH_TOKEN and then delete this output:\n\n${tokenJson.refresh_token}\n`,
    { headers: { "Content-Type": "text/plain" } }
  );
};
