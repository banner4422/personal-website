// @ts-check
/// <reference types="vitest/config" />
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import { visualizer } from "rollup-plugin-visualizer";

// https://astro.build/config
export default defineConfig({
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
        imageService: "compile",
    }),

    // Enable prefetching for faster page navigation
    prefetch: true,

    vite: {
        plugins: [
            tailwindcss(),
            /** @type {import('vite').PluginOption} */
            (
                visualizer({
                    emitFile: true,
                    filename: "stats.html",
                })
            ),
            // Pre-bundle deps missing from the Cloudflare adapter's configEnvironment
            // hook, to prevent mid-request dep optimizer reloads that crash the
            // workerd module runner and pollute the browser's module graph.
            /** @type {import('vite').Plugin} */
            ({
                name: "pre-bundle-missing-deps",
                configEnvironment(name) {
                    if (name === "ssr") {
                        return {
                            optimizeDeps: {
                                include: [
                                    "astro-font",
                                    "astro/virtual-modules/transitions.js",
                                    "astro/zod",
                                ],
                            },
                        };
                    }
                    if (name === "client") {
                        return {
                            optimizeDeps: {
                                include: [
                                    "astro/virtual-modules/transitions-router.js",
                                    "astro/virtual-modules/transitions-types.js",
                                    "astro/virtual-modules/transitions-events.js",
                                    "astro/virtual-modules/transitions-swap-functions.js",
                                ],
                            },
                        };
                    }
                },
            }),
        ],
        server: {
            warmup: {
                ssrFiles: [
                    "./src/pages/index.astro",
                    "./src/pages/about.astro",
                    "./src/pages/now.astro",
                    "./src/pages/404.astro",
                    "./src/pages/500.astro",
                    "./src/pages/blog/index.astro",
                    "./src/pages/blog/[...slug].astro",
                    "./src/layouts/app/Footer.astro",
                ],
            },
        },
        ssr: {
            external: [
                "node:url",
                "node:path",
                "node:crypto",
                "node:fs",
                "node:os",
                "node:buffer",
                "node:fs/promises",
                "node:async_hooks",
            ],
        },
        test: {
            globals: true,
            environment: "node",
            include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        },
    },
    markdown: {
        syntaxHighlight: "shiki",
        shikiConfig: {
            theme: "github-dark",
            wrap: true,
        },
    },
});
