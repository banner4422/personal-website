import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/runtime-env";

function base64url(bytes: Uint8Array) {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function sha256(input: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return new Uint8Array(hash);
}

export const GET: APIRoute = async ({ locals, cookies, redirect, url }) => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI, SPOTIFY_SCOPES } = getEnv(locals);

  // Optional setup protection: require ?key= to match SPOTIFY_SETUP_KEY if it exists
  const setupKey = (locals.runtime.env as any)?.SPOTIFY_SETUP_KEY as string | undefined;
  if (setupKey) {
    const key = url.searchParams.get("key");
    if (!key || key !== setupKey) {
      return new Response("Forbidden: invalid or missing setup key", { status: 403 });
    }
  }

  const verifier = base64url(crypto.getRandomValues(new Uint8Array(64)));
  const challenge = base64url(await sha256(verifier));

  cookies.set("spotify_pkce_verifier", verifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: SPOTIFY_SCOPES ?? "",
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  return redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};
