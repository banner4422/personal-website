<script lang="ts">
    import { onMount } from "svelte";

    let isDark = false;

    onMount(() => {
        const syncMode = () => {
            isDark = document.documentElement.classList.contains("dark");
        };

        syncMode();
        const observer = new MutationObserver(syncMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    });

    const toggleMode = () => {
        isDark = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", isDark ? "#000000" : "#ffffff");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };
</script>

<button
    type="button"
    on:click={toggleMode}
    aria-label={isDark ? "Turn light mode on" : "Turn dark mode on"}
    class="dark:bg-zinc-50 bg-zinc-900 relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ml-auto cursor-pointer"
>
    <span class="sr-only"
        >{isDark ? "Turn light mode on" : "Turn dark mode on"}</span
    >
    <span
        class="inline-block h-4 w-4 transform rounded-full dark:translate-x-1 dark:bg-zinc-900 translate-x-6 bg-zinc-50 transition-all duration-300"
    >
    </span>
</button>
