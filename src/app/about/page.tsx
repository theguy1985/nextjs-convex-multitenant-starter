import Link from "next/link";

/**
 * About page component
 * Displays information about the application
 */
export default function AboutPage() {
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
                <h1 className="text-4xl font-bold tracking-tight">About</h1>

                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Tech Stack</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>
                            <strong>Frontend:</strong> Next.js 15 with React 19 and TypeScript
                        </li>
                        <li>
                            <strong>Backend:</strong> Convex for real-time database and serverless functions
                        </li>
                        <li>
                            <strong>Styling:</strong> Tailwind CSS v4
                        </li>
                        <li>
                            <strong>Build Tool:</strong> Turbopack for fast development
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        <li>File-based routing with Next.js App Router</li>
                        <li>Real-time data synchronization with Convex</li>
                        <li>Type-safe API calls and database queries</li>
                        <li>Dark mode support out of the box</li>
                        <li>Responsive design with Tailwind CSS</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Getting Started</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Start building by editing files in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">src/app</code> directory.
                        Add your Convex functions in the <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">convex</code> directory.
                    </p>
                </div>
            </main>
        </div>
    );
}

