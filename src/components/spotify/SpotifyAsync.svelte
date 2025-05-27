<script lang="ts">
    import { onMount } from "svelte";
    import AnimatedBars from "./AnimatedBars.svelte";
    import SpotifyLogo from "./SpotifyLogo.svelte";
    import LoadingSpinner from "./LoadingSpinner.svelte";
    import { spotifyData, fetchSpotifyData } from "../../lib/spotify/spotifyStore";
    import type { NowPlayingSong } from "../../lib/spotify/spotify";

    let loading = true;
    let data: NowPlayingSong = {
        album: "",
        albumImageUrl: "",
        artist: "",
        isPlaying: false,
        songUrl: "",
        title: "",
    };

    let unsubscribe: () => void;

    onMount(() => {
        unsubscribe = spotifyData.subscribe((state) => {
            loading = state.loading;
            if (state.data) {
                data = state.data;
            }
        });

        fetchSpotifyData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    });
</script>

<div class="flex flex-row items-center">
    {#if loading}
        <LoadingSpinner />
    {:else if data.isPlaying}
        <div class="hidden sm:flex">
            <AnimatedBars />
        </div>
        <div class="flex sm:hidden flex-col space-y-2">
            <AnimatedBars/>
            <SpotifyLogo />
        </div>
    {:else}
        <SpotifyLogo />
    {/if}
    <div class="inline-flex flex-col sm:flex-row w-full max-w-full truncate ml-2">
        {#if loading}
            <p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
            <span class="mx-2 text-gray-500 dark:text-gray-300 hidden sm:flex"> – </span>
            <p class="text-gray-500 dark:text-gray-300 max-w-max truncate">Spotify</p>
        {:else if data.isPlaying}
            <a
                class="text-gray-800 dark:text-gray-200 font-medium max-w-fit w-72 sm:w-60 md:w-40 truncate hover:underline"
                href={data.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={data.title}
            >
                {data.title}
            </a>
            <span class="hidden sm:flex mx-2 text-gray-500 dark:text-gray-300"> – </span>
            <p class="text-gray-500 dark:text-gray-300 max-w-fit w-72 sm:w-60 md:w-40 truncate" title={data.artist}>
                {data.artist}
            </p>
        {:else}
            <p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
            <span class="hidden sm:flex mx-2 text-gray-500 dark:text-gray-300"> – </span>
            <p class="text-gray-500 dark:text-gray-300 max-w-max truncate">Spotify</p>
        {/if}
    </div>
</div>
