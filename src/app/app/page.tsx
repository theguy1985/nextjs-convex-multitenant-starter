"use client";

/**
 * App Dashboard Page (app.domain.com)
 * Main dashboard for authenticated users
 */
export default function AppDashboardPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Welcome to your application dashboard
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</h3>
                    <p className="text-3xl font-bold mt-2">1,234</p>
                    <p className="text-sm text-green-600 mt-2">↑ 12% from last month</p>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tenants</h3>
                    <p className="text-3xl font-bold mt-2">42</p>
                    <p className="text-sm text-green-600 mt-2">↑ 5% from last month</p>
                </div>

                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</h3>
                    <p className="text-3xl font-bold mt-2">$12,345</p>
                    <p className="text-sm text-green-600 mt-2">↑ 8% from last month</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                            <div>
                                <p className="font-medium">Activity Item {i}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Description of the activity</p>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

