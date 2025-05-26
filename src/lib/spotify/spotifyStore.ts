import { writable, get } from "svelte/store";
import type { NowPlayingSong } from "./spotify";

// Create a store for Spotify data
export const spotifyData = writable<{
    data: NowPlayingSong | null;
    lastFetched: number;
    loading: boolean;
}>({
    data: null,
    lastFetched: 0,
    loading: true,
});

// Helper to determine if current data is "empty"
function isEmptyData(data: NowPlayingSong | null) {
    return !data || data.title === "";
}

// Function to fetch Spotify data with caching
export async function fetchSpotifyData() {
    const currentTime = Date.now();
    const state = get(spotifyData);

    // Start loading
    spotifyData.update((s) => ({ ...s, loading: true }));

    const shouldFetch =
        !state.data || isEmptyData(state.data) || currentTime - state.lastFetched > 30 * 1000;

    if (shouldFetch) {
        try {
            const response = await fetch("/api/spotify");
            const data: NowPlayingSong = await response.json();

            spotifyData.set({
                data,
                lastFetched: currentTime,
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching Spotify data:", error);
            spotifyData.update((s) => ({ ...s, loading: false }));
        }
    } else {
        // Keep existing data, just set loading to false
        spotifyData.update((s) => ({ ...s, loading: false }));
    }
}
