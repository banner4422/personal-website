import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string(),
        category: z.string(),
    }),
});

const now = defineCollection({
    loader: glob({ base: "./src/content/now", pattern: "**/[^_]*.{md,mdx}" }),
    schema: () =>
        z.object({
            date: z.date(),
        }),
});

export const collections = { blog, now };
