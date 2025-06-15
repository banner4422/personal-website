// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
    trailingSlash: "always",
    output: "server",
    site: "https://chrkn.dev",
    integrations: [
        mdx({
            // Enable syntax highlighting with Shiki
            syntaxHighlight: "shiki",
            shikiConfig: {
                // Choose a theme for syntax highlighting
                theme: "github-dark",
                // Add custom languages
                langs: [],
                // Enable word wrap for better mobile experience
                wrap: true,
            },
        }),
        sitemap(),
        svelte(),
    ],
    adapter: cloudflare({
        platformProxy: {
            enabled: true
        },
        imageService: "compile"
    }),

    // Enable prefetching for faster page navigation
    prefetch: true,

    vite: {
        plugins: [
            tailwindcss(),
            visualizer({
                emitFile: true,
                filename: "stats.html",
            }),
        ],
        ssr: {
            external: [
                'node:url',
                'node:path',
                'node:crypto',
                'node:fs',
                'node:os',
                'node:buffer',
                'node:fs/promises',
                'path'
            ]
        }
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "github-dark",
            wrap: true,
        },
    },
});
