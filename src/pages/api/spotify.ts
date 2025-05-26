import { getNowPlaying } from "../../lib/spotify/spotify";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    try {
        const response = await getNowPlaying();

        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Failed to fetch /api/spotify:", error);

        return new Response(
            JSON.stringify({
                error: "Failed to retrieve Spotify data",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};
