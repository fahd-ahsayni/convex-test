import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all tasks
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("desc").collect();
  },
});

// Create a new task
export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, { text }) => {
    return await ctx.db.insert("tasks", {
      text,
      isCompleted: false,
    });
  },
});

// Update a task (toggle complete or edit text)
export const update = mutation({
  args: {
    id: v.id("tasks"),
    text: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, text, isCompleted }) => {
    const task = await ctx.db.get(id);
    if (!task) throw new Error("Task not found");

    await ctx.db.patch(id, {
      ...(text !== undefined ? { text } : {}),
      ...(isCompleted !== undefined ? { isCompleted } : {}),
    });
  },
});

// Delete a task
export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
