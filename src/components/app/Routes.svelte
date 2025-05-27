<script lang="ts">
    export let currentPath = "/";

    const navigationRoutes = [
        { name: "Home", route: "/" },
        { name: "About", route: "/about" },
        { name: "Blog", route: "/blog" },
    ];

    function isCurrentRoute(route: string): boolean {
        if (!currentPath) return false;
        return route === "/"
            ? currentPath === "/"
            : currentPath === route || currentPath.startsWith(route + "/");
    }
</script>

{#each navigationRoutes as route (route)}
    <span class="sr-only">{route.name}</span>
    <a
        href={route.route}
        data-astro-prefetch
        class={`p-1 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors duration-300 ${
            isCurrentRoute(route.route)
                ? "font-semibold text-zinc-800 dark:text-gray-200"
                : "font-normal text-gray-600 dark:text-gray-400"
        }`}
    >
        {route.name}
    </a>
{/each}
