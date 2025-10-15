import Link from "next/link";

/**
 * Main Landing Page (domain.com)
 * SSR landing page for the main SaaS website
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold">Your SaaS</h1>
              <div className="hidden md:flex gap-6">
                <Link href="/" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                  Home
                </Link>
                <Link href="/about" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                  About
                </Link>
                <Link href="/pricing" className="text-sm hover:text-gray-600 dark:hover:text-gray-400">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="http://app.localhost:3000"
                className="text-sm hover:text-gray-600 dark:hover:text-gray-400"
              >
                Login
              </a>
              <a
                href="http://app.localhost:3000"
                className="text-sm px-4 py-2 bg-foreground text-background rounded-lg hover:bg-gray-800 dark:hover:bg-gray-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold tracking-tight mb-6">
              Build Your Multi-Tenant
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                SaaS Platform
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              A modern multi-tenant SaaS platform with subdomain routing, real-time data sync,
              and enterprise-grade features. Built with Next.js, Convex, and TypeScript.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="http://app.localhost:3000"
                className="px-8 py-4 bg-foreground text-background rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-300"
              >
                Start Free Trial
              </a>
              <Link
                href="/about"
                className="px-8 py-4 border-2 border-foreground rounded-lg font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-3">Multi-Tenancy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each customer gets their own subdomain with isolated data and custom branding
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Sync</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Powered by Convex for instant updates and real-time collaboration
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-8">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-3">SSR Ready</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Server-side rendering for SEO-friendly tenant sites and blazing fast performance
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600 dark:text-blue-300">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create your account at app.domain.com
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600 dark:text-purple-300">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Configure</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Set up your tenant site with custom branding
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-600 dark:text-green-300">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Launch</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your site goes live at yourname.domain.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
            © 2024 Your SaaS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
