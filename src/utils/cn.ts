/**
 * Utility function to merge class names
 * Useful for combining Tailwind classes conditionally
 * 
 * @param classes - Array of class names or conditionals
 * @returns Merged class string
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

