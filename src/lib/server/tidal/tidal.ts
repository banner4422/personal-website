const LASTFM_API_KEY = import.meta.env.LASTFM_TOKEN as string;
const LASTFM_USER = "christiankn"; // Requested username

export interface NowPlayingSong {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
}

export interface LastfmRecentTracksResponse {
    recenttracks: {
        track: LastfmTrack[];
        "@attr"?: {
            user: string;
            page: string;
            perPage: string;
            totalPages: string;
            total: string;
        };
    };
}

export interface LastfmTrack {
    artist: {
        "#text": string;
        mbid?: string;
    };
    name: string;
    album: {
        "#text": string;
        mbid?: string;
    };
    url: string;
    image: {
        "#text": string;
        size: "small" | "medium" | "large" | "extralarge" | "mega";
    }[];
    date?: {
        uts: string; // Unix timestamp as string
        "#text": string; // Human-readable date string
    };
    "@attr"?: {
        nowplaying: "true";
    };
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
    if (!LASTFM_API_KEY) {
        console.error("Missing LASTFM_TOKEN env var");
        return EMPTY_RESPONSE;
    }

    const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${encodeURIComponent(
        LASTFM_USER
    )}&api_key=${encodeURIComponent(LASTFM_API_KEY)}&format=json&limit=1`;

    try {
        const response = await fetchWithRetry(endpoint, { cache: "no-store" });
        if (!response.ok) {
            console.error("Last.fm request failed:", response.status, response.statusText);
            return EMPTY_RESPONSE;
        }

        const data = (await response.json()) as LastfmRecentTracksResponse;
        const track = data?.recenttracks?.track?.[0];
        if (!track) return EMPTY_RESPONSE;

        const isPlaying = track?.["@attr"]?.nowplaying === "true";
        if (!isPlaying) return EMPTY_RESPONSE; // Maintain existing UI: show Not Playing when nothing is live

        // Prefer larger images if available
        const img = track.image?.find((i) => i.size === "extralarge")
            || track.image?.find((i) => i.size === "large")
            || track.image?.[0];

        return {
            album: track.album?.["#text"] ?? "",
            albumImageUrl: img?.["#text"] ?? "",
            artist: track.artist?.["#text"] ?? "",
            isPlaying: true,
            songUrl: track.url ?? "",
            title: track.name ?? "",
        };
    } catch (error) {
        console.error("Error fetching Last.fm now playing data:", error);
        return EMPTY_RESPONSE;
    }
};
