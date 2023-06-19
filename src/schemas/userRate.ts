import z from "zod";

export const UserRateScoreSchema = z.object({
  name: z.number(),
  value: z.number(),
});

export const UserRateStatusSchema = z.object({
  name: z.string(),
  value: z.number(),
});

export const UserRateSchema = z.object({
  id: z.number(),
  user_id: z.nullable(z.number()),
  target_id: z.nullable(z.number()),
  target_type: z.nullable(z.string()),
  score: z.number(),
  status: z.string(),
  text: z.nullable(z.string()),
  episodes: z.nullable(z.number()),
  chapters: z.nullable(z.number()),
  volumes: z.nullable(z.number()),
  text_html: z.string(),
  rewatches: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
});
