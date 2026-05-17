import { defineMiddleware } from "astro:middleware";
import { addSecurityHeaders } from "./lib/securityHeaders";

export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();
    const headers = new Headers(response.headers);
    addSecurityHeaders(headers);
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
});
