import { getNowPlaying } from "../../lib/spotify/spotify";
import type { APIRoute } from "astro";

const allowedOrigins = [
    "chrkn.dk",
    "www.chrkn.dk",
    "chrkn.dev",
    "www.chrkn.dev",
];

export const GET: APIRoute = async ({ request }) => {
    if (!import.meta.env.DEV) {
        const origin = request.headers.get("origin") || "";
        const referer = request.headers.get("referer") || "";

        const originIsAllowed = allowedOrigins.some(domain =>
            origin.includes(domain) || referer.includes(domain)
        );

        if (!originIsAllowed) {
            return new Response(
                JSON.stringify({ error: "Unauthorized: origin not allowed" }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    }

    try {
        const response = await getNowPlaying();

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=15, stale-while-revalidate=30",
            },
        });
    } catch (error) {
        console.error("Failed to fetch /api/spotify:", error);

        return new Response(
            JSON.stringify({ error: "Failed to retrieve Spotify data" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
