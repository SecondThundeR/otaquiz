import z from "zod";

export const VideoSchema = z.object({
  id: z.number(),
  url: z.string(),
  image_url: z.string(),
  player_url: z.string(),
  name: z.nullable(z.string()),
  kind: z.string(),
  hosting: z.string(),
});
