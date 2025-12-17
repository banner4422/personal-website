import type { APIRoute } from "astro";
import { getEnv } from "../../../lib/runtime-env";
import { getAccessToken } from "../../../lib/spotify";

type SpotifyNowPlayingResponse = {
    device?: {
        id: string;
        is_active: boolean;
        is_private_session: boolean;
        is_restricted: boolean;
        name: string;
        type: string;
        volume_percent: number;
        supports_volume: boolean;
    };
    repeat_state?: string;
    shuffle_state?: boolean;
    context: {
        type: string;
        href: string;
        external_urls: {
            spotify: string;
        };
        uri: string;
    };
    timestamp: number; // Unix timestamp in milliseconds
    progress_ms: number; // Progress into the currently playing track in milliseconds.
    is_playing: boolean;
    item: {
        album: {
            album_type: string;
            total_tracks: number;
            available_markets: string[];
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            images: {
                url: string;
                height: number;
                width: number;
            }[]; // Biggest image is first
            name: string;
            release_date: string; // YYYY-MM-DD
            release_date_precision: string;
            restrictions: {
                reason: string;
            };
            type: string;
            uri: string;
            artists: {
                external_urls: {
                    spotify: string;
                };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }[];
        };
        artists: {
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number; // Duration of the track in milliseconds.
        explicit: boolean;
        external_ids: {
            isrc?: string;
            ean?: string;
            upc?: string;
        };
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from: {
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        };
        restrictions: {
            reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
    };
    currently_playing_type: string;
    actions: {
        interrupting_playback: boolean;
        pausing: boolean;
        resuming: boolean;
        seeking: boolean;
        skipping_next: boolean;
        skipping_prev: boolean;
        toggling_repeat_context: boolean;
        toggling_shuffle: boolean;
        toggling_repeat_track: boolean;
        transferring_playback: boolean;
    };
};


export const GET: APIRoute = async ({ locals }) => {
  const env = getEnv(locals);
  const accessToken = await getAccessToken(env);

  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204) {
    return new Response(
      JSON.stringify({
        album: "",
        albumImageUrl: "",
        artist: "",
        isPlaying: false,
        songUrl: "",
        title: "",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const json = await res.json<SpotifyNowPlayingResponse>();
  const body = {
    album: json?.item?.album?.name ?? "",
    albumImageUrl: json?.item?.album?.images?.[0]?.url ?? "",
    artist: Array.isArray(json?.item?.artists)
      ? json.item.artists.map((a: { name: string }) => a.name).join(", ")
      : "",
    isPlaying: Boolean(json?.is_playing),
    songUrl: json?.item?.external_urls?.spotify ?? "",
    title: json?.item?.name ?? "",
  };

  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
};
