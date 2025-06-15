<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import AppearanceModeSwitch from "./AppearanceModeSwitch.svelte";
    import CloseXIcon from "../icons/CloseXIcon.svelte";
    import HamburgerIcon from "../icons/HamburgerIcon.svelte";

    export let navigationRoutes: { name: string; route: string }[];
    export let currentPath: string;

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;

        // Prevent scrolling when menu is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    const closeMenu = () => {
        isOpen = false;
        document.body.style.overflow = "";
    };

    const isCurrentRoute = (route: string): boolean => {
        if (!currentPath) return false;
        return route === "/"
            ? currentPath === "/"
            : currentPath === route || currentPath.startsWith(route + "/");
    };

    // Handle clicks on the overlay background
    const handleOverlayClick = (event: MouseEvent) => {
        // Check if the click is directly on the overlay (not its children)
        if (event.target === event.currentTarget) {
            closeMenu();
        }
    };

    // Handle keyboard events for the overlay
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    };

    // Close menu when route changes
    onMount(() => {
        return () => {
            document.body.style.overflow = "";
        };
    });
</script>

<button
    aria-label={isOpen ? "Close menu" : "Open menu"}
    class="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
    on:click={toggleMenu}
>
    <HamburgerIcon />
</button>

{#if isOpen}
    <div
        class="fixed inset-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md backdrop-saturate-150"
        transition:fade={{ duration: 200 }}
        on:click={handleOverlayClick}
        on:keydown={handleKeydown}
        role="dialog"
        tabindex="0"
        aria-label="Mobile navigation menu"
    >
        <div class="flex justify-start items-center w-full p-4 sm:py-8 py-4">
            <button
                aria-label="Close menu"
                class="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                on:click={closeMenu}
            >
                <CloseXIcon />
            </button>
            <AppearanceModeSwitch />
        </div>

        <div class="flex flex-col items-start space-y-6 w-full px-8 mt-8">
            {#each navigationRoutes as route (route)}
                <span class="sr-only">{route.name}</span>
                <a
                    href={route.route}
                    on:click={closeMenu}
                    class={`text-xl p-4 w-full text-left rounded-lg transition-all duration-300 
                        hover:bg-zinc-200 hover:scale-105 dark:hover:bg-zinc-800 
                        ${
                            isCurrentRoute(route.route)
                                ? "font-semibold text-zinc-800 dark:text-zinc-200"
                                : "font-normal text-zinc-600 dark:text-zinc-400"
                        }`}
                >
                    {route.name}
                </a>
            {/each}
        </div>
    </div>
{/if}

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
</style>
