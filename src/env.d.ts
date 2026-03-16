/// <reference types="@cloudflare/workers-types" />

declare global {
    interface Env {
        SPOTIFY_CLIENT_ID: string;
        SPOTIFY_CLIENT_SECRET: string;
        SPOTIFY_REFRESH_TOKEN: string;
        ASSETS: Fetcher;
        SESSION: KVNamespace;
    }
}

export {};
