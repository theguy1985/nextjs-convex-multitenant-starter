import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware to handle subdomain-based routing
 * - domain.com -> main landing page
 * - app.domain.com -> dashboard
 * - *.domain.com -> tenant-specific pages
 */
export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get("host") || "";

    // Get the subdomain from the hostname
    const subdomain = getSubdomain(hostname);

    console.log(`[Middleware] Host: ${hostname}, Subdomain: ${subdomain || "none"}`);

    // Handle app subdomain - redirect to /app routes
    if (subdomain === "app") {
        // If already on /app route, continue
        if (url.pathname.startsWith("/app")) {
            return NextResponse.next();
        }
        // Rewrite to /app routes
        url.pathname = `/app${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // Handle tenant subdomains (any subdomain except 'app' and 'www')
    if (subdomain && subdomain !== "www") {
        // If already on /tenant route, continue
        if (url.pathname.startsWith("/tenant")) {
            return NextResponse.next();
        }
        // Rewrite to /tenant routes and pass subdomain as header
        url.pathname = `/tenant${url.pathname}`;
        const response = NextResponse.rewrite(url);
        response.headers.set("x-tenant-subdomain", subdomain);
        return response;
    }

    // Main domain (domain.com or www.domain.com) - continue normally
    return NextResponse.next();
}

/**
 * Extracts subdomain from hostname
 * @param hostname - Full hostname from request
 * @returns subdomain or null
 */
function getSubdomain(hostname: string): string | null {
    // Remove port if present
    const host = hostname.split(":")[0];

    // For localhost development
    if (host.includes("localhost")) {
        // Format: subdomain.localhost:3000
        const parts = host.split(".");
        if (parts.length >= 2 && parts[0] !== "localhost") {
            return parts[0];
        }
        return null;
    }

    // For production domains
    const parts = host.split(".");

    // Need at least 3 parts for subdomain (subdomain.domain.com)
    if (parts.length >= 3) {
        const subdomain = parts[0];
        // Ignore 'www' as it's the main domain
        return subdomain === "www" ? null : subdomain;
    }

    return null;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};

