import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to generate an upload URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return uploadUrl;
  }
});

// Mutation to record metadata after upload
export const saveImage = mutation({
  args: {
    name: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { name, storageId }) => {
    const id = await ctx.db.insert("images", {
      name,
      storageId,
      createdAt: Date.now(),
    });
    return id;
  }
});

// Query to list images + URLs
export const listImages = query({
  args: {},
  handler: async (ctx) => {
    const imgs = await ctx.db.query("images").order("desc").collect();
    return Promise.all(imgs.map(async (img) => ({
      _id: img._id,
      name: img.name,
      url: await ctx.storage.getUrl(img.storageId),
      createdAt: img.createdAt,
    })));
  }
});
