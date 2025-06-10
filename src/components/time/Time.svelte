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

<span class="text-black dark:text-white font-medium">{time}</span>
