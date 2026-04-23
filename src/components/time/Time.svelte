<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    const formatter = new Intl.DateTimeFormat("en-DK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Copenhagen",
    });

    let time = formatter.format(new Date());
    let revealed = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateTime = () => {
        time = formatter.format(new Date());
    };

    const scheduleNextUpdate = () => {
        const now = new Date();
        const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        timeoutId = setTimeout(() => {
            updateTime();
            scheduleNextUpdate();
        }, msUntilNextMinute);
    };

    const reveal = () => {
        revealed = true;
        scheduleNextUpdate();
    };

    onMount(() => {
        updateTime();
    });

    onDestroy(() => {
        clearTimeout(timeoutId);
    });
</script>

<span
    class="time-display font-medium tabular-nums {revealed
        ? 'time-revealed text-black dark:text-white'
        : 'time-blurred text-zinc-400 dark:text-zinc-500'}"
    class:interactive={!revealed}
    on:click={() => !revealed && reveal()}
    on:keydown={(e) => !revealed && e.key === "Enter" && reveal()}
    role={revealed ? undefined : "button"}
    tabindex={revealed ? undefined : 0}
    title={revealed ? undefined : "Click to reveal the time"}>{time}</span
>

<style>
    .time-blurred {
        filter: blur(8px);
        cursor: pointer;
        user-select: none;
        transition: filter 0.4s ease;
    }

    .time-blurred:hover {
        filter: blur(4px);
    }

    .time-revealed {
        filter: blur(0);
        transition: filter 0.6s ease-out;
    }
</style>
