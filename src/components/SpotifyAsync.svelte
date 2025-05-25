<script lang="ts">
	import { onMount } from "svelte";
	import AnimatedBars from "./AnimatedBars.svelte";
	import SpotifyLogo from "./SpotifyLogo.svelte";
	import { spotifyData, fetchSpotifyData } from "../lib/spotifyStore";

	let loading = true;
	let data = {
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
		<SpotifyLogo />
	{:else if data.isPlaying}
		<AnimatedBars />
	{:else}
		<SpotifyLogo />
	{/if}
	<div class="inline-flex flex-row w-full max-w-full truncate ml-2">
		{#if loading}
			<p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
			<span class="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block"> – </span>
			<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">Spotify</p>
		{:else if data.isPlaying}
			<a
				class="text-gray-800 dark:text-gray-200 font-medium max-w-max truncate"
				href={data.songUrl}
				target="_blank"
				rel="noopener noreferrer"
			>
				{data.title}
			</a>
			<span class="mx-2 text-gray-500 dark:text-gray-300 block"> – </span>
			<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">
				{data.artist}
			</p>
		{:else}
			<p class="text-gray-800 dark:text-gray-200 font-medium">Not Playing</p>
			<span class="mx-2 text-gray-500 dark:text-gray-300 block"> – </span>
			<p class="text-gray-500 dark:text-gray-300 max-w-max truncate">Spotify</p>
		{/if}
	</div>
</div>
