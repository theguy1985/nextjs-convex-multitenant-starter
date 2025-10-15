import { getSubdomain } from "@/utils/subdomain";
import Link from "next/link";

/**
 * Tenant Landing Page (tenant.domain.com)
 * SSR page that displays tenant-specific content
 */
export default async function TenantPage() {
    const subdomain = await getSubdomain();

    // TODO: Fetch tenant data from Convex based on subdomain
    // const tenant = await fetchTenantData(subdomain);

    return (
        <div className="flex min-h-screen flex-col">
            {/* Tenant Navigation */}
            <nav className="border-b border-gray-200 dark:border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold">{subdomain || "Tenant"}</h1>
                            <div className="hidden md:flex gap-6">
                                <Link href="/" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                                    Home
                                </Link>
                                <Link href="/about" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                                    About
                                </Link>
                                <Link href="/contact" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                                    Contact
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Link
                                href="/login"
                                className="text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="mb-4 inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                            Subdomain: <span className="font-mono font-semibold">{subdomain || "unknown"}</span>
                        </div>
                        <h1 className="text-5xl font-bold tracking-tight mb-6">
                            Welcome to {subdomain ? `${subdomain}'s` : "Your"} Site
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                            This is a tenant-specific landing page. Each subdomain can have its own unique content,
                            branding, and data fetched from Convex.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/login"
                                className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-300"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/about"
                                className="px-6 py-3 border-2 border-foreground rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold mb-2">Customized</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Each tenant gets their own customized experience
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-2">Fast</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Server-side rendered for optimal performance
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-2">Secure</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Data isolation for each tenant
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
                    © 2024 {subdomain || "Your Company"}. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

