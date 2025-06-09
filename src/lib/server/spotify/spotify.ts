const client_id = import.meta.env.SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN as string;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

export const getAccessToken = async () => {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
        return cachedAccessToken;
    }

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const data = await response.json();

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

        const song = await response.json();
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
