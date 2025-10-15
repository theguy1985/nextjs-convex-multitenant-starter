"use client";

import Link from "next/link";

/**
 * Dashboard page component
 * Example page demonstrating client-side rendering
 */
export default function DashboardPage() {
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
                <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-xl font-semibold mb-2">Welcome!</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            This is your dashboard. Start adding your own components and features here.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-xl font-semibold mb-2">Quick Stats</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Add your metrics and statistics here.
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-xl font-semibold mb-2">Recent Activity</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Display recent user activity or updates.
                        </p>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-2xl font-semibold mb-4">Convex Integration</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        This page is ready to use Convex hooks like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">useQuery</code> and{" "}
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">useMutation</code> to interact with your backend.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Example: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">const data = useQuery(api.myModule.myQuery);</code>
                    </p>
                </div>
            </main>
        </div>
    );
}

