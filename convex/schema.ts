import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Multi-tenant database schema
 * Defines tables for tenants, users, and tenant-specific data
 */
export default defineSchema({
    // Tenants table - stores information about each tenant organization
    tenants: defineTable({
        name: v.string(),
        subdomain: v.string(), // Unique subdomain (e.g., "acme" for acme.domain.com)
        slug: v.string(), // URL-friendly version of name
        isActive: v.boolean(),
        settings: v.optional(
            v.object({
                primaryColor: v.optional(v.string()),
                logo: v.optional(v.string()),
                customDomain: v.optional(v.string()),
            })
        ),
    })
        .index("by_subdomain", ["subdomain"])
        .index("by_slug", ["slug"])
        .index("by_active", ["isActive"]),

    // Users table - stores user accounts
    users: defineTable({
        name: v.string(),
        email: v.string(),
        tenantId: v.id("tenants"), // Which tenant this user belongs to
        role: v.union(v.literal("admin"), v.literal("member"), v.literal("viewer")),
        isActive: v.boolean(),
    })
        .index("by_email", ["email"])
        .index("by_tenant", ["tenantId"])
        .index("by_tenant_and_email", ["tenantId", "email"]),

    // Example: tenant-specific content
    posts: defineTable({
        tenantId: v.id("tenants"),
        authorId: v.id("users"),
        title: v.string(),
        content: v.string(),
        status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    })
        .index("by_tenant", ["tenantId"])
        .index("by_tenant_and_status", ["tenantId", "status"])
        .index("by_author", ["authorId"]),
});

