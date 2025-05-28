<script lang="ts">
    import { formatArticleDate } from "../../lib/utils";

    export let post;
</script>

<div class="mb-12">
    <a
        href={`/blog/${post.id}/`}
        class="group block transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 -m-2"
    >
        <img
            src={post.data.heroImage}
            alt=""
            class="w-full rounded-xl mb-4 transition-all duration-200 group-hover:shadow-lg"
            width={1020}
            height={510}
        />
        <h2
            class="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:underline"
            title={post.data.title}
        >
            {post.data.title}
        </h2>
        <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            <span>{formatArticleDate(new Date(post.data.pubDate))}</span>
            {#if post.data.category}
                <span
                    class="inline-block text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    title={post.data.category}
                >
                    {post.data.category}
                </span>
            {/if}
        </div>
        <p class="mt-2 text-gray-700 dark:text-gray-300" title={post.data.description}>
            {post.data.description}
        </p>
    </a>
</div>
