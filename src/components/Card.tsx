import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

/**
 * Reusable Card component
 * Provides a consistent container style
 */
export function Card({ children, title, className = "" }: CardProps) {
    return (
        <div className={`rounded-lg border border-gray-200 dark:border-gray-800 p-6 ${className}`}>
            {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
            {children}
        </div>
    );
}

