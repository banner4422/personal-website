import type { Env } from "./runtime-env";

export async function getAccessToken(env: Env): Promise<string> {
  if (!env.SPOTIFY_REFRESH_TOKEN) throw new Error("Missing SPOTIFY_REFRESH_TOKEN");

  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`Spotify refresh failed: ${JSON.stringify(json)}`);

  return json.access_token as string;
}
