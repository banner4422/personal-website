<script lang="ts">
    import { onMount } from "svelte";
    let mounted = false;

    onMount(() => {
        mounted = true;
    });
</script>

<div class="w-auto flex items-end overflow-hidden">
    <span
        class={`w-1 h-2 mr-[3px] bg-gray-300 dark:bg-gray-500 opacity-75 inline-block transform-origin-bottom ${mounted ? "animate-bar1" : ""}`}
    ></span>
    <span
        class={`w-1 h-1 mr-[3px] bg-gray-300 dark:bg-gray-500 inline-block transform-origin-bottom ${mounted ? "animate-bar2" : ""}`}
    ></span>
    <span
        class={`w-1 h-3 mr-[3px] bg-gray-300 dark:bg-gray-500 opacity-80 inline-block transform-origin-bottom ${mounted ? "animate-bar3" : ""}`}
    ></span>
</div>

<style>
    .transform-origin-bottom {
        transform-origin: bottom;
    }

    .animate-bar1 {
        animation: bar1 1s ease-in-out infinite;
    }

    .animate-bar2 {
        animation: bar2 1.5s ease-in-out 0.2s infinite;
    }

    .animate-bar3 {
        animation: bar3 1.5s ease-in-out 0.3s infinite;
    }

    @keyframes bar1 {
        0%,
        100% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(1.5);
        }
    }

    @keyframes bar2 {
        0%,
        100% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(2);
        }
    }

    @keyframes bar3 {
        0%,
        100% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(0.5);
        }
    }
</style>
