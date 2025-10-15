import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Seed test data for development
 * Creates sample tenants and users for testing multi-tenancy
 * 
 * Run this mutation from the Convex dashboard or CLI:
 * npx convex run seed:seedTestData
 */
export const seedTestData = mutation({
    args: {},
    returns: v.null(),
    handler: async (ctx) => {
        // Check if data already exists
        const existingTenants = await ctx.db.query("tenants").collect();
        if (existingTenants.length > 0) {
            console.log("Test data already exists. Skipping seed.");
            return null;
        }

        // Create test tenants
        const tenant1 = await ctx.db.insert("tenants", {
            name: "Acme Corporation",
            subdomain: "acme",
            slug: "acme-corp",
            isActive: true,
            settings: {
                primaryColor: "#3b82f6",
                logo: "",
            },
        });

        const tenant2 = await ctx.db.insert("tenants", {
            name: "Tech Startup Inc",
            subdomain: "techstartup",
            slug: "tech-startup",
            isActive: true,
            settings: {
                primaryColor: "#8b5cf6",
                logo: "",
            },
        });

        const tenant3 = await ctx.db.insert("tenants", {
            name: "Demo Company",
            subdomain: "demo",
            slug: "demo-company",
            isActive: true,
            settings: {
                primaryColor: "#10b981",
                logo: "",
            },
        });

        // Create test users for each tenant
        await ctx.db.insert("users", {
            name: "John Doe",
            email: "john@acme.com",
            tenantId: tenant1,
            role: "admin" as const,
            isActive: true,
        });

        await ctx.db.insert("users", {
            name: "Jane Smith",
            email: "jane@techstartup.com",
            tenantId: tenant2,
            role: "admin" as const,
            isActive: true,
        });

        await ctx.db.insert("users", {
            name: "Demo User",
            email: "user@demo.com",
            tenantId: tenant3,
            role: "member" as const,
            isActive: true,
        });

        // Create some sample posts
        await ctx.db.insert("posts", {
            tenantId: tenant1,
            authorId: (await ctx.db
                .query("users")
                .withIndex("by_tenant", (q) => q.eq("tenantId", tenant1))
                .first())!._id,
            title: "Welcome to Acme",
            content: "This is our first post!",
            status: "published" as const,
        });

        await ctx.db.insert("posts", {
            tenantId: tenant2,
            authorId: (await ctx.db
                .query("users")
                .withIndex("by_tenant", (q) => q.eq("tenantId", tenant2))
                .first())!._id,
            title: "Tech Startup Launches",
            content: "We're excited to announce our launch!",
            status: "published" as const,
        });

        console.log("Test data seeded successfully!");
        console.log("Access tenants at:");
        console.log("- http://acme.localhost:3000");
        console.log("- http://techstartup.localhost:3000");
        console.log("- http://demo.localhost:3000");

        return null;
    },
});

/**
 * Clear all test data
 * Use with caution - this will delete all data!
 * 
 * Run this mutation from the Convex dashboard or CLI:
 * npx convex run seed:clearTestData
 */
export const clearTestData = mutation({
    args: {},
    returns: v.null(),
    handler: async (ctx) => {
        // Delete all posts
        const posts = await ctx.db.query("posts").collect();
        for (const post of posts) {
            await ctx.db.delete(post._id);
        }

        // Delete all users
        const users = await ctx.db.query("users").collect();
        for (const user of users) {
            await ctx.db.delete(user._id);
        }

        // Delete all tenants
        const tenants = await ctx.db.query("tenants").collect();
        for (const tenant of tenants) {
            await ctx.db.delete(tenant._id);
        }

        console.log("All test data cleared!");
        return null;
    },
});

