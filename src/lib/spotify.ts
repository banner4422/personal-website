const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number | null = null;

interface SpotifyCredentials {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}

const getAccessToken = async (credentials: SpotifyCredentials): Promise<string | null> => {
    const currentTime = Date.now();

    if (cachedAccessToken && tokenExpiryTime && currentTime < tokenExpiryTime) {
        return cachedAccessToken;
    }

    const basic = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: credentials.refreshToken,
        }),
    });

    if (!response.ok) {
        console.error(`Failed to fetch access token: ${response.statusText}`);
        return null;
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

export const getNowPlaying = async (credentials: SpotifyCredentials): Promise<NowPlayingSong> => {
    try {
        const accessToken = await getAccessToken(credentials);

        if (!accessToken) {
            return EMPTY_RESPONSE;
        }

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
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
