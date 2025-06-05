<script lang="ts">
    import SearchAndFilterControls from "./blog/SearchAndFilterControls.svelte";
    import FeaturedPost from "./blog/FeaturedPost.svelte";
    import PostGrid from "./blog/PostGrid.svelte";
    import { type GetImageResult } from "astro";

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
    export let slugsToImage: { [slug: string]: GetImageResult } = {};

    let selectedCategory = "all";
    let sortOrder = "newest";
    let searchTerm = "";

    $: categories = [
        "all",
        ...new Set(posts.map((p) => p.data.category).filter(Boolean)),
    ] as string[];

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
</script>

<div class="mb-8">
    <SearchAndFilterControls bind:selectedCategory bind:sortOrder bind:searchTerm {categories} />

    {#if filtered.length === 0}
        <p class="text-center text-gray-600 dark:text-gray-400 py-8">No posts found.</p>
    {:else}
        {#if featuredPost}
            <FeaturedPost post={featuredPost} slugsToImage={slugsToImage} />
        {/if}

        {#if filtered.length > 1}
            <PostGrid posts={filtered.slice(1)} slugsToImage={slugsToImage} />
        {/if}
    {/if}
</div>
