"use client";

import { getSubdomain } from "@/utils/subdomain";
import { TenantData } from "@/components/TenantData";
import { useSubdomain } from "@/utils/subdomain";
import Link from "next/link";

/**
 * Tenant Demo Page (tenant.domain.com/demo)
 * Demonstrates Convex integration with real-time tenant data
 */
export default function TenantDemoPage() {
    const subdomain = useSubdomain();

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
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Tenant Data Demo</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        This page demonstrates real-time data fetching from Convex based on the subdomain.
                    </p>
                </div>

                {subdomain ? (
                    <TenantData subdomain={subdomain} />
                ) : (
                    <div className="rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-6">
                        <p className="text-yellow-800 dark:text-yellow-200">
                            No subdomain detected. Access this page from a subdomain (e.g., tenant1.localhost:3000)
                        </p>
                    </div>
                )}

                <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-6">
                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        💡 Development Tip
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                        To test locally, access this page at:{" "}
                        <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                            http://tenant1.localhost:3000/demo
                        </code>
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
                        First create a tenant using the app dashboard at:{" "}
                        <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                            http://app.localhost:3000
                        </code>
                    </p>
                </div>
            </main>
        </div>
    );
}

