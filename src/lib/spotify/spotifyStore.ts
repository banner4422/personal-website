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

// Function to fetch Spotify data with caching
export async function fetchSpotifyData() {
    const currentTime = Date.now();

    // Get current state before updating
    const state = get(spotifyData);

    // Update loading state
    spotifyData.update((s) => ({ ...s, loading: true }));

    // Only fetch if we don't have data or if it's older than 30 seconds
    if (!state.data || currentTime - state.lastFetched > 30000) {
        try {
            const response = await fetch("/api/spotify");
            const data = await response.json();

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
        // If we have recent data, just update loading state
        spotifyData.update((s) => ({ ...s, loading: false }));
    }
}
