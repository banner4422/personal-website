const client_id = import.meta.env.SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET as string; // kept for potential future use
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN as string;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

type SpotifyAccessTokenResponse = {
    access_token: string,
    token_type: string,
    scope: string,
    expires_in: number,
    refresh_token: string
};

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

export const getAccessToken = async () => {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
        return cachedAccessToken;
    }

    // Use a PKCE-compatible refresh flow: include client_id in body and omit Basic auth.
    // This works for refresh tokens minted via PKCE (public client). Spotify accepts client_id in body.
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id,
    });

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        let detail = "";
        try {
            detail = await response.text();
        } catch {}
        throw new Error(
            `Failed to fetch access token: ${response.status} ${response.statusText}${detail ? ` — ${detail}` : ""}`
        );
    }

    const data = await response.json<SpotifyAccessTokenResponse>();

    cachedAccessToken = data.access_token;
    tokenExpiryTime = currentTime + data.expires_in * 1000;

    return cachedAccessToken;
};

export interface NowPlayingSong {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
}

const EMPTY_RESPONSE: NowPlayingSong = {
    album: "",
    albumImageUrl: "",
    artist: "",
    isPlaying: false,
    songUrl: "",
    title: "",
};

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = MAX_RETRIES,
    delay = RETRY_DELAY
): Promise<Response> => {
    try {
        return await fetch(url, options);
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }

        console.warn(`Fetch failed, retrying in ${delay}ms... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
};

export const getNowPlaying = async (): Promise<NowPlayingSong> => {
    try {
        const accessToken = await getAccessToken();

        const response = await fetchWithRetry(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        if (response.status === 204 || response.status >= 400) {
            return EMPTY_RESPONSE;
        }

        const song = await response.json<SpotifyNowPlayingResponse>();
        if (!song?.item) return EMPTY_RESPONSE;

        return {
            album: song.item.album?.name ?? "",
            albumImageUrl: song.item.album?.images?.[0]?.url ?? "",
            artist: song.item.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
            isPlaying: song.is_playing ?? false,
            songUrl: song.item.external_urls?.spotify ?? "",
            title: song.item.name ?? "",
        };
    } catch (error) {
        console.error("Error fetching now playing data:", error);
        return EMPTY_RESPONSE;
    }
};

export const getTopTracks = async () => {
    try {
        const accessToken = await getAccessToken();

        return await fetchWithRetry(TOP_TRACKS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        console.error("Error fetching top tracks:", error);
        throw error;
    }
};
