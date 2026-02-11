# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Build and run with Wrangler (Cloudflare local preview)
npm run deploy       # Build and deploy to Cloudflare

npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format with Prettier

npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Architecture

This is a personal website built with **Astro** (server-side rendered via Cloudflare adapter) and **Svelte** for interactive components.

### Stack

- **Astro 5** with `output: "server"` mode deployed to **Cloudflare Workers**
- **Svelte 5** for client-side interactive components
- **Tailwind CSS v4** with the typography plugin
- **MDX** for blog content with Shiki syntax highlighting
- **Nanostores** for client-side state management (persistent atoms)
- **mode-watcher** for dark/light theme handling

### Key Files

- `src/consts.ts` - Site metadata, author info, social media links, and SEO keywords
- `src/content.config.ts` - Astro content collections schema for `blog` and `now` pages
- `src/stores/blogState.ts` - Client-side state for blog filtering/sorting (uses nanostores)
- `src/lib/spotify.ts` - Spotify "now playing" integration with token caching

### Content Collections

Blog posts go in `src/content/blog/` as `.md` or `.mdx` files with frontmatter:

```yaml
title: string
description: string
pubDate: date
updatedDate: date (optional)
heroImage: string
category: string
```

### Environment Variables

Required for Spotify integration (see `.env.example`):

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

### Component Patterns

- `.astro` files for static/server components, `.svelte` files for interactive client components
- Layouts in `src/layouts/` - `AppLayout.astro` is the main wrapper with navigation and footer
- Icons are in `src/components/icons/` - Astro for static SVGs, Svelte for interactive ones
