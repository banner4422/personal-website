const cspDirectives: Record<string, string> = {
    "default-src": "'self'",
    // data: required at runtime — Astro's ClientRouter loads data: URIs during view transitions
    "script-src": "'self' 'unsafe-inline' data:",
    // unsafe-inline required for Svelte inline styles and Tailwind CSS
    "style-src": "'self' 'unsafe-inline'",
    // data: for inline SVG images
    "img-src": "'self' data:",
    // fonts are self-hosted
    "font-src": "'self'",
    // no client-side API calls to external services
    "connect-src": "'self'",
    "frame-src": "'none'",
    "frame-ancestors": "'none'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self'",
    "upgrade-insecure-requests": "",
};

const cspValue = Object.entries(cspDirectives)
    .map(([key, value]) => (value ? `${key} ${value}` : key))
    .join("; ");

export function addSecurityHeaders(headers: Headers): void {
    headers.set("Content-Security-Policy", cspValue);
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    headers.set("X-Frame-Options", "DENY");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
    );
}
