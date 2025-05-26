<script lang="ts">
    import { mode, toggleMode } from "mode-watcher";
</script>

<button
    on:click={toggleMode}
    aria-label={mode.current === "dark" ? "Turn light mode on" : "Turn dark mode on"}
    class="dark:bg-gray-50 bg-zinc-900 relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ml-auto cursor-pointer"
>
    <span class="sr-only"
        >{mode.current === "dark" ? "Turn light mode on" : "Turn dark mode on"}</span
    >
    <span
        class="inline-block h-4 w-4 transform rounded-full dark:translate-x-1 dark:bg-zinc-900 translate-x-6 bg-gray-50 transition-all duration-300"
    >
    </span>
</button>
