import { ReactNode } from "react";

/**
 * App subdomain layout (app.domain.com)
 * Provides layout for the dashboard and authenticated sections
 */
export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* App Navigation */}
            <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <h1 className="text-xl font-bold">Your App</h1>
                            <div className="hidden md:flex gap-6">
                                <a href="/app" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                                    Dashboard
                                </a>
                                <a href="/app/settings" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                                    Settings
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-sm px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
                                Profile
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}

