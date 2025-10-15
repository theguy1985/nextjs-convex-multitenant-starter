# Gym Next App

A modern, multi-tenant SaaS application built with Next.js 15, Convex, and TypeScript. Features subdomain-based routing, real-time data sync, and enterprise-grade multi-tenancy.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Backend**: Convex (Real-time database & serverless functions)
- **Styling**: Tailwind CSS v4
- **Build Tool**: Turbopack
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js 18+ and npm
- A Convex account (free at [convex.dev](https://convex.dev))

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

First, initialize your Convex project:

```bash
npx convex dev
```

This will:
- Create a new Convex project (or link to an existing one)
- Generate your `NEXT_PUBLIC_CONVEX_URL`
- Start the Convex development server

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

The `NEXT_PUBLIC_CONVEX_URL` will be automatically added by the Convex CLI when you run `npx convex dev`.

### 4. Seed Test Data

Create some test tenants for development:

```bash
npx convex run seed:seedTestData
```

This will create three test tenants:
- `acme` - Access at http://acme.localhost:3000
- `techstartup` - Access at http://techstartup.localhost:3000
- `demo` - Access at http://demo.localhost:3000

### 5. Start Development Server

```bash
npm run dev
```

This starts both Next.js and Convex development servers.

### 6. Access the Application

- **Main Site**: http://localhost:3000
- **App Dashboard**: http://app.localhost:3000
- **Tenant Sites**: http://acme.localhost:3000 (or any tenant subdomain you created)

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Main landing page (domain.com)
│   │   ├── about/        # About page
│   │   ├── app/          # App dashboard (app.domain.com)
│   │   │   ├── page.tsx
│   │   │   └── settings/
│   │   └── tenant/       # Tenant sites (*.domain.com)
│   │       ├── page.tsx
│   │       ├── about/
│   │       └── demo/
│   ├── middleware.ts     # Subdomain routing logic
│   ├── components/       # Reusable components
│   ├── utils/            # Utility functions
│   └── providers/        # React context providers
├── convex/               # Convex backend
│   ├── schema.ts         # Multi-tenant schema
│   ├── tenants.ts        # Tenant queries/mutations
│   ├── users.ts          # User queries/mutations
│   └── seed.ts           # Test data seeding
├── MULTI_TENANT_SETUP.md # Detailed multi-tenancy guide
└── package.json
```

## 🎯 Available Routes

### Main Site (`localhost:3000`)
- `/` - Marketing landing page
- `/about` - About page
- `/pricing` - Pricing page (placeholder)

### App Dashboard (`app.localhost:3000`)
- `/app` - Dashboard home
- `/app/settings` - Settings and tenant management

### Tenant Sites (`*.localhost:3000`)
- `/` - Tenant landing page (SSR with tenant data)
- `/about` - Tenant about page
- `/demo` - Demo page showing real-time Convex data

## 🏢 Multi-Tenancy Features

### Subdomain-Based Routing

The app automatically routes requests based on subdomain:
- `domain.com` → Main marketing site
- `app.domain.com` → Admin dashboard
- `tenant.domain.com` → Tenant-specific site

### Tenant Data Isolation

All tenant data is isolated using `tenantId`:

```typescript
// Fetch tenant by subdomain
const tenant = useQuery(api.tenants.getBySubdomain, { subdomain: "acme" });

// Get users for a specific tenant
const users = useQuery(api.users.getByTenant, { tenantId });
```

### Custom Branding

Each tenant can have:
- Custom primary color
- Logo
- Custom domain (optional)

### Real-Time Updates

All data is synced in real-time using Convex subscriptions.

## 📝 Convex API

### Tenant Functions (`convex/tenants.ts`)

- `getBySubdomain(subdomain)` - Get tenant by subdomain
- `listActive()` - List all active tenants
- `create({ name, subdomain, slug, settings })` - Create new tenant
- `updateSettings({ tenantId, settings })` - Update tenant branding
- `deactivate({ tenantId })` - Deactivate tenant

### User Functions (`convex/users.ts`)

- `getByTenant({ tenantId })` - Get all users in a tenant
- `getByEmail({ tenantId, email })` - Find user by email
- `create({ tenantId, name, email, role })` - Create new user
- `updateRole({ userId, role })` - Update user permissions

## 🔧 Available Scripts

- `npm run dev` - Start Next.js and Convex development servers
- `npm run dev:next` - Start only Next.js development server
- `npm run dev:convex` - Start only Convex development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `NEXT_PUBLIC_CONVEX_URL` environment variable
4. Deploy!

### Deploy Convex

```bash
npx convex deploy
```

This will deploy your Convex functions to production.

## 📄 License

MIT
