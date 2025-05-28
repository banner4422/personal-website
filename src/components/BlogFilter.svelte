<script lang="ts">
    import { classNames, formatArticleDate, formatPostDate } from "../lib/utils";

    interface Post {
        id: string;
        collection: "blog";
        data: {
            title: string;
            description: string;
            pubDate: Date;
            category?: string;
            updatedDate?: Date;
            heroImage?: string;
        };
    }

    export let posts: Post[] = [];

    let selectedCategory = "all";
    let sortOrder = "newest";
    let searchTerm = "";

    $: categories = ["all", ...new Set(posts.map((p) => p.data.category).filter(Boolean))];

    $: filtered = posts
        .filter((p) => {
            // Filter by category
            const categoryMatch =
                selectedCategory === "all" || p.data.category === selectedCategory;

            // Filter by search term (title, description, or category)
            const searchMatch =
                searchTerm === "" ||
                p.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.data.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.data.category &&
                    p.data.category.toLowerCase().includes(searchTerm.toLowerCase()));

            return categoryMatch && searchMatch;
        })
        .sort((a, b) => {
            const aDate = new Date(a.data.pubDate).valueOf();
            const bDate = new Date(b.data.pubDate).valueOf();
            return sortOrder === "oldest" ? aDate - bDate : bDate - aDate;
        });

    $: featuredPost = filtered[0];

    const toggleSortOrder = () => (sortOrder = sortOrder === "newest" ? "oldest" : "newest");
</script>

<div class="mb-8">
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

    {#if filtered.length === 0}
        <p class="text-center text-gray-600 dark:text-gray-400 py-8">No posts found.</p>
    {:else}
        {#if featuredPost}
            <div class="mb-12">
                <a
                    href={`/blog/${featuredPost.id}/`}
                    class="group block transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 -m-2"
                >
                    <img
                        src={featuredPost.data.heroImage}
                        alt=""
                        class="w-full rounded-xl mb-4 transition-all duration-200 group-hover:shadow-lg"
                        width={1020}
                        height={510}
                    />
                    <h2
                        class="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:underline"
                        title={featuredPost.data.title}
                    >
                        {featuredPost.data.title}
                    </h2>
                    <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <span>{formatArticleDate(new Date(featuredPost.data.pubDate))}</span>
                        {#if featuredPost.data.category}
                            <span
                                class="inline-block text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                                title={featuredPost.data.category}
                            >
                                {featuredPost.data.category}
                            </span>
                        {/if}
                    </div>
                    <p
                        class="mt-2 text-gray-700 dark:text-gray-300"
                        title={featuredPost.data.description}
                    >
                        {featuredPost.data.description}
                    </p>
                </a>
            </div>
        {/if}

        {#if filtered.length > 1}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {#each filtered.slice(1) as post (post)}
                    <a
                        data-astro-prefetch
                        id={post.id}
                        href={`/blog/${post.id}/`}
                        class="group block transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg overflow-hidden"
                    >
                        <img
                            src={post.data.heroImage}
                            alt=""
                            class="w-full h-48 object-cover rounded-t-lg"
                            width={720}
                            height={360}
                        />
                        <div class="p-4">
                            <h3
                                class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:underline"
                                title={post.data.title}
                            >
                                {post.data.title}
                            </h3>
                            <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <span>{formatPostDate(new Date(post.data.pubDate))}</span>
                                {#if post.data.category}
                                    <span
                                        class="inline-block text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                                        title={post.data.category}
                                    >
                                        {post.data.category}
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    {/if}
</div>
