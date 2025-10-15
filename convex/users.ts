import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get users by tenant
 * Returns all users belonging to a specific tenant
 */
export const getByTenant = query({
    args: { tenantId: v.id("tenants") },
    returns: v.array(
        v.object({
            _id: v.id("users"),
            _creationTime: v.number(),
            name: v.string(),
            email: v.string(),
            tenantId: v.id("tenants"),
            role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
            isActive: v.boolean(),
        })
    ),
    handler: async (ctx, args) => {
        const users = await ctx.db
            .query("users")
            .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
            .collect();

        return users;
    },
});

/**
 * Get user by email within a tenant
 * Used for authentication and user lookup
 */
export const getByEmail = query({
    args: {
        tenantId: v.id("tenants"),
        email: v.string(),
    },
    returns: v.union(
        v.object({
            _id: v.id("users"),
            _creationTime: v.number(),
            name: v.string(),
            email: v.string(),
            tenantId: v.id("tenants"),
            role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
            isActive: v.boolean(),
        }),
        v.null()
    ),
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_tenant_and_email", (q) =>
                q.eq("tenantId", args.tenantId).eq("email", args.email)
            )
            .first();

        return user;
    },
});

/**
 * Create a new user within a tenant
 * Used during user registration or invitation
 */
export const create = mutation({
    args: {
        tenantId: v.id("tenants"),
        name: v.string(),
        email: v.string(),
        role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
    },
    returns: v.id("users"),
    handler: async (ctx, args) => {
        // Verify tenant exists
        const tenant = await ctx.db.get(args.tenantId);
        if (!tenant) {
            throw new Error("Tenant not found");
        }

        // Check if user already exists in this tenant
        const existing = await ctx.db
            .query("users")
            .withIndex("by_tenant_and_email", (q) =>
                q.eq("tenantId", args.tenantId).eq("email", args.email)
            )
            .first();

        if (existing) {
            throw new Error("User already exists in this tenant");
        }

        const userId = await ctx.db.insert("users", {
            tenantId: args.tenantId,
            name: args.name,
            email: args.email,
            role: args.role,
            isActive: true,
        });

        return userId;
    },
});

/**
 * Update user role
 * Used for permission management
 */
export const updateRole = mutation({
    args: {
        userId: v.id("users"),
        role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);

        if (!user) {
            throw new Error("User not found");
        }

        await ctx.db.patch(args.userId, {
            role: args.role,
        });

        return null;
    },
});

