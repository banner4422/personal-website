import { writable } from "svelte/store";
import type { NowPlayingSong } from "./spotify";

export const spotifyData = writable<{
    data: NowPlayingSong | null;
    loading: boolean;
}>({
    data: null,
    loading: true,
});

export async function fetchSpotifyData() {
    spotifyData.set({ data: null, loading: true });

    try {
        const res = await fetch("/api/spotify");
        const data: NowPlayingSong = await res.json();

        spotifyData.set({ data, loading: false });
    } catch (err) {
        console.error("Error fetching Spotify data:", err);
        spotifyData.set({ data: null, loading: false });
    }
}
