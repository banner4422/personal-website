<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    let time = "";
    let intervalId: ReturnType<typeof setInterval>;

    const updateTime = () => {
        const formatter = new Intl.DateTimeFormat("en-DK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Europe/Copenhagen",
        });
        time = formatter.format(new Date());
    };

    onMount(() => {
        updateTime();
        intervalId = setInterval(updateTime, 60000);
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });
</script>

<div>
    <p
        class="text-black dark:text-zinc-200 text-center"
        title="It refreshes every minute from when you open the page, so it is not real-time"
    >
        Time in Copenhagen is <span class="text-black dark:text-white font-medium">{time}</span>
    </p>
</div>
