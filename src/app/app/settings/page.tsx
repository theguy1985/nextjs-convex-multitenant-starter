"use client";

/**
 * App Settings Page (app.domain.com/settings)
 * Settings and configuration for the app
 */
export default function AppSettingsPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your application settings
                </p>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Organization Name</label>
                            <input
                                type="text"
                                placeholder="Your Organization"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Tenant Management */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                    <h2 className="text-xl font-semibold mb-4">Tenant Management</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Manage your multi-tenant configurations and subdomains
                    </p>
                    <button className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-gray-800 dark:hover:bg-gray-300">
                        Add New Tenant
                    </button>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="px-6 py-2 bg-foreground text-background rounded-lg hover:bg-gray-800 dark:hover:bg-gray-300">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

