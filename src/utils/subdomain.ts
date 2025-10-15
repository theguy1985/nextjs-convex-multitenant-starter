import { headers } from "next/headers";

/**
 * Gets the current subdomain from headers (set by middleware)
 * Use this in Server Components
 */
export async function getSubdomain(): Promise<string | null> {
    const headersList = await headers();
    return headersList.get("x-tenant-subdomain");
}

/**
 * Extracts subdomain from a hostname string
 * Useful for client-side subdomain detection
 */
export function extractSubdomain(hostname: string): string | null {
    // Remove port if present
    const host = hostname.split(":")[0];

    // For localhost development
    if (host.includes("localhost")) {
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
        return subdomain === "www" ? null : subdomain;
    }

    return null;
}

/**
 * Client-side hook to get current subdomain
 * Use this in Client Components
 */
export function useSubdomain(): string | null {
    if (typeof window === "undefined") return null;
    return extractSubdomain(window.location.hostname);
}

