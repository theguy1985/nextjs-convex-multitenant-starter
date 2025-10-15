import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Example query function
 * Returns a simple greeting message
 */
export const getGreeting = query({
    args: {},
    returns: v.string(),
    handler: async () => {
        return "Hello from Convex!";
    },
});

/**
 * Example query with arguments
 * Returns a personalized greeting
 */
export const getPersonalGreeting = query({
    args: { name: v.string() },
    returns: v.string(),
    handler: async (ctx, args) => {
        return `Hello, ${args.name}!`;
    },
});

/**
 * Example mutation function
 * Demonstrates how to write data (currently just returns a message)
 */
export const createExample = mutation({
    args: { text: v.string() },
    returns: v.string(),
    handler: async (ctx, args) => {
        // You can add database operations here
        // const id = await ctx.db.insert("tableName", { field: args.text });
        return `Created: ${args.text}`;
    },
});

