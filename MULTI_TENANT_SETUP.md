# Multi-Tenant Setup Guide

This guide explains how to set up and use the multi-tenant architecture in this project.

## 🏗️ Architecture Overview

The application supports three types of subdomains:

1. **Main Site** (`domain.com` or `localhost:3000`)
   - Marketing landing page
   - Public-facing website
   - Routes: `/`, `/about`, `/pricing`

2. **App Dashboard** (`app.domain.com` or `app.localhost:3000`)
   - Admin dashboard
   - Tenant management
   - Settings and configuration
   - Routes: `/app`, `/app/settings`

3. **Tenant Sites** (`*.domain.com` or `*.localhost:3000`)
   - Customer-specific sites
   - SSR pages with tenant data
   - Custom branding per tenant
   - Routes: `/`, `/about`, `/demo`

## 🚀 Local Development Setup

### 1. Prerequisites

```bash
# Install dependencies
npm install

# Start Convex
npx convex dev
```

### 2. Testing Subdomains Locally

For local development, you'll use subdomain routing with `localhost`:

- **Main site**: `http://localhost:3000`
- **App dashboard**: `http://app.localhost:3000`
- **Tenant site**: `http://tenant1.localhost:3000`

### 3. Create a Test Tenant

First, you need to create a tenant in Convex. You can do this via the app dashboard or programmatically:

#### Option A: Using Convex Dashboard

1. Go to your Convex dashboard
2. Navigate to the `tenants` table
3. Add a new document:

```json
{
  "name": "Tenant 1",
  "subdomain": "tenant1",
  "slug": "tenant-1",
  "isActive": true,
  "settings": {
    "primaryColor": "#3b82f6",
    "logo": ""
  }
}
```

#### Option B: Using the API

Create a mutation to seed test data:

```typescript
// In convex/seed.ts
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedTestTenant = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await ctx.db.insert("tenants", {
      name: "Acme Corporation",
      subdomain: "acme",
      slug: "acme-corp",
      isActive: true,
      settings: {
        primaryColor: "#3b82f6",
      },
    });
    return null;
  },
});
```

Then run it from your dashboard or use `npx convex run seed:seedTestTenant`.

### 4. Access Your Tenant Site

Once you've created a tenant, access it at:
```
http://tenant1.localhost:3000
```

or

```
http://acme.localhost:3000
```

(depending on the subdomain you used)

## 📁 File Structure

```
src/
├── app/
│   ├── page.tsx                 # Main landing page (domain.com)
│   ├── about/                   # About page for main site
│   ├── app/                     # App dashboard routes (app.domain.com)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── settings/
│   └── tenant/                  # Tenant-specific routes (*.domain.com)
│       ├── layout.tsx
│       ├── page.tsx
│       ├── about/
│       └── demo/                # Demo page showing Convex data
├── middleware.ts                # Subdomain routing logic
├── utils/
│   └── subdomain.ts             # Subdomain utilities
└── components/
    └── TenantData.tsx           # Component to display tenant data

convex/
├── schema.ts                    # Multi-tenant database schema
├── tenants.ts                   # Tenant queries/mutations
└── users.ts                     # User queries/mutations
```

## 🔧 How Subdomain Routing Works

### 1. Middleware Detection

The middleware (`src/middleware.ts`) intercepts all requests and:
- Extracts the subdomain from the hostname
- Rewrites the URL to the appropriate route:
  - `app.domain.com` → `/app/*`
  - `tenant1.domain.com` → `/tenant/*`
  - `domain.com` → stays at root

### 2. Subdomain Header

For tenant sites, the middleware adds a custom header:
```
x-tenant-subdomain: tenant1
```

This header can be read in Server Components using `getSubdomain()`.

### 3. Data Fetching

Tenant-specific pages fetch data based on the subdomain:

```typescript
// In Server Components
const subdomain = await getSubdomain();
// Use subdomain to fetch tenant data from Convex

// In Client Components
const subdomain = useSubdomain();
// Use React hooks to fetch data
```

## 🗄️ Database Schema

### Tenants Table

```typescript
{
  name: string;              // Display name
  subdomain: string;         // Unique subdomain (e.g., "acme")
  slug: string;              // URL-friendly identifier
  isActive: boolean;         // Whether tenant is active
  settings?: {
    primaryColor?: string;   // Brand color
    logo?: string;           // Logo URL
    customDomain?: string;   // Optional custom domain
  };
}
```

### Users Table

```typescript
{
  name: string;
  email: string;
  tenantId: Id<"tenants">;   // Link to tenant
  role: "admin" | "member" | "viewer";
  isActive: boolean;
}
```

## 🌐 Production Deployment

### DNS Setup

For production, you'll need to configure DNS:

1. **Main domain**: A record pointing to your server
2. **Wildcard subdomain**: A record or CNAME for `*.yourdomain.com`

Example DNS records:
```
A     @               <your-server-ip>
A     app             <your-server-ip>
CNAME *               yourdomain.com
```

### Vercel Deployment

If deploying to Vercel:

1. Add your domain in Vercel dashboard
2. Configure wildcard domain: `*.yourdomain.com`
3. Vercel automatically handles subdomain routing

### Environment Variables

Make sure to set:
```env
NEXT_PUBLIC_CONVEX_URL=<your-convex-deployment-url>
```

## 📊 Features

### Per-Tenant Data Isolation

All tenant data is scoped by `tenantId`:
```typescript
// Query posts for a specific tenant
const posts = await ctx.db
  .query("posts")
  .withIndex("by_tenant", (q) => q.eq("tenantId", tenantId))
  .collect();
```

### Custom Branding

Each tenant can have custom:
- Primary color
- Logo
- Custom domain

### Real-Time Updates

Using Convex, all data updates are real-time:
```typescript
const tenant = useQuery(api.tenants.getBySubdomain, { subdomain });
// Automatically updates when tenant data changes
```

## 🧪 Testing

### Test URLs

- Main: `http://localhost:3000`
- App: `http://app.localhost:3000`
- Tenant 1: `http://tenant1.localhost:3000`
- Tenant 1 About: `http://tenant1.localhost:3000/about`
- Tenant 1 Demo: `http://tenant1.localhost:3000/demo`

### Testing Workflow

1. Start the development servers:
   ```bash
   npm run dev
   ```

2. Create test tenants via Convex dashboard or seed script

3. Access different subdomains to test routing

4. Verify data isolation between tenants

## 🔒 Security Considerations

1. **Data Isolation**: Always filter queries by `tenantId`
2. **Subdomain Validation**: Validate subdomain format in middleware
3. **User Permissions**: Check user roles before allowing actions
4. **Custom Domains**: Validate custom domain ownership before allowing

## 📚 Additional Resources

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Convex Multi-Tenancy](https://docs.convex.dev/database/indexes)
- [Subdomain Routing Guide](https://vercel.com/docs/concepts/edge-network/headers)

