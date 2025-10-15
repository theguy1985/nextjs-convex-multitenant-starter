"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

interface TenantDataProps {
    subdomain: string;
}

/**
 * Component to display tenant-specific data
 * Fetches data from Convex based on subdomain
 */
export function TenantData({ subdomain }: TenantDataProps) {
    const tenant = useQuery(api.tenants.getBySubdomain, { subdomain });

    if (tenant === undefined) {
        return (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (tenant === null) {
        return (
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                    Tenant Not Found
                </h3>
                <p className="text-sm text-red-600 dark:text-red-400">
                    No tenant found with subdomain: <span className="font-mono">{subdomain}</span>
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                    You may need to create this tenant in the app dashboard first.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-2xl font-bold mb-4">Tenant Information</h2>
            <dl className="space-y-2">
                <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Name</dt>
                    <dd className="text-lg">{tenant.name}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Subdomain</dt>
                    <dd className="text-lg font-mono">{tenant.subdomain}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Slug</dt>
                    <dd className="text-lg font-mono">{tenant.slug}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</dt>
                    <dd>
                        <span
                            className={`inline-block px-2 py-1 text-xs rounded-full ${tenant.isActive
                                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                }`}
                        >
                            {tenant.isActive ? "Active" : "Inactive"}
                        </span>
                    </dd>
                </div>
                {tenant.settings?.primaryColor && (
                    <div>
                        <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">Primary Color</dt>
                        <dd className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded border border-gray-300"
                                style={{ backgroundColor: tenant.settings.primaryColor }}
                            />
                            <span className="font-mono text-sm">{tenant.settings.primaryColor}</span>
                        </dd>
                    </div>
                )}
            </dl>
        </div>
    );
}

