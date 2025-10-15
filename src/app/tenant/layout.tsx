import { ReactNode } from "react";

/**
 * Tenant subdomain layout (*.domain.com)
 * Provides layout for tenant-specific pages
 */
export default function TenantLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            {children}
        </div>
    );
}

