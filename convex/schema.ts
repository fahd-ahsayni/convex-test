import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  messages: defineTable({
    text: v.string(),
    author: v.string(),
    createdAt: v.number(),
  }).index("by_time", ["createdAt"]),
  images: defineTable({
    name: v.string(),
    storageId: v.id("_storage"),
    createdAt: v.number(),
  }),
});