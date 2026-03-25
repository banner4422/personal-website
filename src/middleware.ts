import { defineMiddleware } from "astro:middleware";
import { addSecurityHeaders } from "./lib/securityHeaders";

export const onRequest = defineMiddleware(async (_context, next) => {
    const response = await next();
    addSecurityHeaders(response.headers);
    return response;
});
