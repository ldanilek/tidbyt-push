import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  images: defineTable({
    image: s.bytes(),
  }),
});
