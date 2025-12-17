export type Env = {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN?: string;
  SPOTIFY_REDIRECT_URI: string;
  SPOTIFY_SCOPES?: string;
};

export function getEnv(locals: App.Locals): Env {
  const env = locals.runtime.env as Partial<Env>;

  if (!env.SPOTIFY_CLIENT_ID) throw new Error("Missing SPOTIFY_CLIENT_ID");
  if (!env.SPOTIFY_CLIENT_SECRET) throw new Error("Missing SPOTIFY_CLIENT_SECRET");
  if (!env.SPOTIFY_REDIRECT_URI) throw new Error("Missing SPOTIFY_REDIRECT_URI");

  return env as Env;
}
