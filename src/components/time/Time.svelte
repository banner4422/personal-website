<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { DateTime } from "luxon";

	let time = "";
	let intervalId: ReturnType<typeof setInterval>;

	function updateTime() {
		time = DateTime.now().setZone("Europe/Copenhagen").toFormat("HH:mm");
	}

	onMount(() => {
		// Update time immediately
		updateTime();

		// Update time every minute
		intervalId = setInterval(updateTime, 60000);
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<div>
	<p class="text-gray-500 dark:text-gray-300 text-center">
		Time in Copenhagen is <span class="text-gray-800 dark:text-gray-200">{time}</span>
	</p>
</div>
