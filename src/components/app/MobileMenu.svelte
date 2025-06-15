<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    export let navigationRoutes: { name: string; route: string }[];
    export let currentPath: string;

    let isOpen = false;

    const toggleMenu = () => {
        isOpen = !isOpen;

        // Prevent scrolling when menu is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        isOpen = false;
        document.body.style.overflow = '';
    };

    const isCurrentRoute = (route: string): boolean => {
        if (!currentPath) return false;
        return route === "/"
            ? currentPath === "/"
            : currentPath === route || currentPath.startsWith(route + "/");
    };

    // Close menu when route changes
    onMount(() => {
        return () => {
            document.body.style.overflow = '';
        };
    });
</script>

<!-- Mobile menu button (hamburger icon) -->
<button 
    aria-label={isOpen ? "Close menu" : "Open menu"}
    class="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
    on:click={toggleMenu}
>
    {#if isOpen}
        <!-- X icon for close -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-800 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    {:else}
        <!-- Hamburger icon for open -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-800 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    {/if}
</button>

<!-- Full screen mobile menu overlay -->
{#if isOpen}
    <div
            class="fixed inset-0 z-50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md backdrop-saturate-150"
            transition:fade={{ duration: 200 }}
    >
        <!-- Close button in top-right corner -->
        <div class="flex justify-start w-full p-4 py-8">
            <button 
                aria-label="Close menu"
                class="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                on:click={closeMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-zinc-800 dark:text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Navigation links -->
        <div class="flex flex-col items-start space-y-6 w-full px-8 mt-8">
            {#each navigationRoutes as route}
                <a
                    href={route.route}
                    on:click={closeMenu}
                    class={`text-xl p-4 w-full text-left rounded-lg transition-all duration-300 
                        hover:bg-zinc-200 hover:scale-105 dark:hover:bg-zinc-800 
                        ${isCurrentRoute(route.route)
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
    /* Fade transition for the menu */
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fade-out {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .fade-in {
        animation: fade-in 200ms ease-out forwards;
    }

    .fade-out {
        animation: fade-out 200ms ease-in forwards;
    }
</style>
