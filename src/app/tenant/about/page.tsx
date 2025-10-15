import { getSubdomain } from "@/utils/subdomain";
import Link from "next/link";

/**
 * Tenant About Page (tenant.domain.com/about)
 * About page for tenant-specific site
 */
export default async function TenantAboutPage() {
    const subdomain = await getSubdomain();

    return (
        <div className="flex min-h-screen flex-col p-8">
            <nav className="mb-8">
                <Link
                    href="/"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
                >
                    ← Back to Home
                </Link>
            </nav>

            <main className="flex max-w-4xl flex-col gap-8 mx-auto w-full">
                <h1 className="text-4xl font-bold tracking-tight">About {subdomain}</h1>

                <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        This is the about page for the <span className="font-mono font-semibold">{subdomain}</span> tenant.
                        You can customize this content based on the tenant's data from Convex.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        This content can be dynamically loaded from your Convex database based on the tenant subdomain.
                        Each tenant can have their own unique story, team information, and branding.
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Define your tenant-specific mission and values here. This data can be managed through
                        your app dashboard and stored in Convex.
                    </p>
                </div>
            </main>
        </div>
    );
}

