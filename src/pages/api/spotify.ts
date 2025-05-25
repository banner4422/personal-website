import { getNowPlaying } from "../../lib/spotify";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const response = await getNowPlaying();

	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
