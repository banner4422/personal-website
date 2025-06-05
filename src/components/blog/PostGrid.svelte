<script lang="ts">
    import { formatPostDate } from "../../lib/utils";
    import { type GetImageResult } from "astro";

    export let posts;
    export let slugsToImage: { [slug: string]: GetImageResult } = {};
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each posts as post (post)}
        <a
            data-astro-prefetch
            id={post.id}
            href={`/blog/${post.id}/`}
            class="group block transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg overflow-hidden"
        >
            <img
                src={slugsToImage[post.data.heroImage].src}
                alt={`${post.data.title} - ${post.data.description}`}
                class="w-full h-48 object-cover rounded-t-lg"
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
