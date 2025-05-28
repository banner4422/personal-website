<script lang="ts">
    import { classNames } from "../../lib/utils";

    export let selectedCategory: string;
    export let sortOrder: string;
    export let searchTerm: string;
    export let categories: string[];

    const toggleSortOrder = () => {
        sortOrder = sortOrder === "newest" ? "oldest" : "newest";
    };
</script>

<div class="flex flex-wrap items-center justify-between gap-4 mb-8">
    <div class="flex-1 min-w-[200px]">
        <div class="relative h-10">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
            </div>
            <input
                type="text"
                id="search"
                bind:value={searchTerm}
                placeholder="Search"
                title="Search by title, description, category"
                class={classNames(
                    "w-full h-full pl-10",
                    "focus:outline-none focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400",
                    "border border-gray-300 dark:border-gray-700 rounded-md",
                    "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                    "h-10 p-2",
                    "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
            />
        </div>
    </div>

    <div class="flex items-center gap-3 ml-auto">
        <div class="w-[150px] relative">
            <select
                id="category"
                bind:value={selectedCategory}
                class={classNames(
                    "w-full pr-8 text-sm",
                    "focus:ring-0 focus:outline-none",
                    "overflow-hidden text-ellipsis cursor-pointer appearance-none",
                    "border border-gray-300 dark:border-gray-700 rounded-md",
                    selectedCategory !== "all"
                        ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                    "h-10 p-2",
                    "hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
            >
                {#each categories as category (category)}
                    <option
                        value={category}
                        class="truncate"
                        title={category === "all" ? "All Categories" : category}
                    >
                        {category === "all" ? "All Categories" : category}
                    </option>
                {/each}
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
                >
            </div>
        </div>

        <button
            on:click={toggleSortOrder}
            class={classNames(
                "cursor-pointer",
                "border border-gray-300 dark:border-gray-700 rounded-md",
                sortOrder !== "newest"
                    ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "h-10 p-2",
                "hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label={sortOrder === "newest"
                ? "Sorted by newest first"
                : "Sorted by oldest first"}
            title={sortOrder === "newest" ? "Sort by newest" : "Sort by oldest"}
        >
            {#if sortOrder === "newest"}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="m14 18 4-4 4 4" /><path d="M16 2v4" /><path d="M18 22v-8" /><path
                        d="M21 11.343V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9"
                    /><path d="M3 10h18" /><path d="M8 2v4" /></svg
                >
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ><path d="m14 18 4 4 4-4" /><path d="M16 2v4" /><path d="M18 14v8" /><path
                        d="M21 11.354V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.343"
                    /><path d="M3 10h18" /><path d="M8 2v4" /></svg
                >
            {/if}
        </button>
    </div>
</div>
