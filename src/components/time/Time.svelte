<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { DateTime } from "luxon";

    let time = "";
    let intervalId: ReturnType<typeof setInterval>;

    const updateTime = () => {
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
    <p class="text-black dark:text-gray-200 text-center" title="It refreshes every minute from when you open the page, so it is not real-time">
        Time in Copenhagen is <span class="text-black dark:text-white font-medium">{time}</span>
    </p>
</div>
