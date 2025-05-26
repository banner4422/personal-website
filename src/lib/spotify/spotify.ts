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

    // Check if the token is cached and still valid
    if (cachedAccessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
        return cachedAccessToken;
    }

    // Fetch a new token if not cached or expired
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

    const data = await response.json();

    // Cache the token and its expiry time
    cachedAccessToken = data.access_token;
    tokenExpiryTime = currentTime + data.expires_in * 1000; // expires_in is in seconds, convert to milliseconds

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

// Cache for now playing data
let nowPlayingCache: {
    data: NowPlayingSong | null;
    timestamp: number;
} = {
    data: null,
    timestamp: 0,
};

// Cache duration in milliseconds (2 minutes)
const CACHE_DURATION = 2 * 60 * 1000;

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Start with 1 second delay

// Helper function to implement retry logic with exponential backoff
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

        console.log(`Fetch failed, retrying in ${delay}ms... (${retries} retries left)`);

        // Wait for the specified delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Retry with exponential backoff
        return fetchWithRetry(url, options, retries - 1, delay * 2);
    }
};

export const getNowPlaying = async (): Promise<NowPlayingSong> => {
    const currentTime = Date.now();

    // Return cached data if it's still valid
    if (nowPlayingCache.data && currentTime - nowPlayingCache.timestamp < CACHE_DURATION) {
        return nowPlayingCache.data;
    }

    try {
        const accessToken = await getAccessToken();

        const response = await fetchWithRetry(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        if (response.status === 204 || response.status > 400) {
            const emptyResponse = {
                album: "",
                albumImageUrl: "",
                artist: "",
                isPlaying: false,
                songUrl: "",
                title: "",
            };

            // Cache the empty response
            nowPlayingCache = {
                data: emptyResponse,
                timestamp: currentTime,
            };

            return emptyResponse;
        }

        const song = await response.json();

        if (song.item === null) {
            const emptyResponse = {
                album: "",
                albumImageUrl: "",
                artist: "",
                isPlaying: false,
                songUrl: "",
                title: "",
            };

            // Cache the empty response
            nowPlayingCache = {
                data: emptyResponse,
                timestamp: currentTime,
            };

            return emptyResponse;
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((artist: { name: string }) => artist.name).join(", ");
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        const nowPlayingData = {
            album,
            albumImageUrl,
            artist,
            isPlaying,
            songUrl,
            title,
        };

        // Cache the successful response
        nowPlayingCache = {
            data: nowPlayingData,
            timestamp: currentTime,
        };

        return nowPlayingData;
    } catch (error) {
        console.error("Error fetching now playing data:", error);

        // If we have cached data, return it even if it's expired
        if (nowPlayingCache.data) {
            return nowPlayingCache.data;
        }

        // Otherwise return an empty response
        return {
            album: "",
            albumImageUrl: "",
            artist: "",
            isPlaying: false,
            songUrl: "",
            title: "",
        };
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
        throw error; // Re-throw the error for the caller to handle
    }
};
