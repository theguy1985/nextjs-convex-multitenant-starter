import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get tenant by subdomain
 * Used to load tenant-specific data on tenant sites
 */
export const getBySubdomain = query({
    args: { subdomain: v.string() },
    returns: v.union(
        v.object({
            _id: v.id("tenants"),
            _creationTime: v.number(),
            name: v.string(),
            subdomain: v.string(),
            slug: v.string(),
            isActive: v.boolean(),
            settings: v.optional(
                v.object({
                    primaryColor: v.optional(v.string()),
                    logo: v.optional(v.string()),
                    customDomain: v.optional(v.string()),
                })
            ),
        }),
        v.null()
    ),
    handler: async (ctx, args) => {
        const tenant = await ctx.db
            .query("tenants")
            .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
            .first();

        return tenant;
    },
});

/**
 * List all active tenants
 * Used in the app dashboard to show all tenants
 */
export const listActive = query({
    args: {},
    returns: v.array(
        v.object({
            _id: v.id("tenants"),
            _creationTime: v.number(),
            name: v.string(),
            subdomain: v.string(),
            slug: v.string(),
            isActive: v.boolean(),
            settings: v.optional(
                v.object({
                    primaryColor: v.optional(v.string()),
                    logo: v.optional(v.string()),
                    customDomain: v.optional(v.string()),
                })
            ),
        })
    ),
    handler: async (ctx) => {
        const tenants = await ctx.db
            .query("tenants")
            .withIndex("by_active", (q) => q.eq("isActive", true))
            .collect();

        return tenants;
    },
});

/**
 * Create a new tenant
 * Used when onboarding a new customer
 */
export const create = mutation({
    args: {
        name: v.string(),
        subdomain: v.string(),
        slug: v.string(),
        settings: v.optional(
            v.object({
                primaryColor: v.optional(v.string()),
                logo: v.optional(v.string()),
                customDomain: v.optional(v.string()),
            })
        ),
    },
    returns: v.id("tenants"),
    handler: async (ctx, args) => {
        // Check if subdomain already exists
        const existing = await ctx.db
            .query("tenants")
            .withIndex("by_subdomain", (q) => q.eq("subdomain", args.subdomain))
            .first();

        if (existing) {
            throw new Error("Subdomain already exists");
        }

        const tenantId = await ctx.db.insert("tenants", {
            name: args.name,
            subdomain: args.subdomain,
            slug: args.slug,
            isActive: true,
            settings: args.settings,
        });

        return tenantId;
    },
});

/**
 * Update tenant settings
 * Used to customize tenant branding and configuration
 */
export const updateSettings = mutation({
    args: {
        tenantId: v.id("tenants"),
        settings: v.object({
            primaryColor: v.optional(v.string()),
            logo: v.optional(v.string()),
            customDomain: v.optional(v.string()),
        }),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        const tenant = await ctx.db.get(args.tenantId);

        if (!tenant) {
            throw new Error("Tenant not found");
        }

        await ctx.db.patch(args.tenantId, {
            settings: args.settings,
        });

        return null;
    },
});

/**
 * Deactivate a tenant
 * Soft delete - keeps data but makes tenant inactive
 */
export const deactivate = mutation({
    args: { tenantId: v.id("tenants") },
    returns: v.null(),
    handler: async (ctx, args) => {
        const tenant = await ctx.db.get(args.tenantId);

        if (!tenant) {
            throw new Error("Tenant not found");
        }

        await ctx.db.patch(args.tenantId, {
            isActive: false,
        });

        return null;
    },
});

