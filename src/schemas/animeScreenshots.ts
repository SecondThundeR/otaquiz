import { z } from "zod";

export const AnimeScreenshotSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
});

export const AnimeScreenshotsDataSchema = z.object({
  id: z.string(),
  screenshots: z.array(AnimeScreenshotSchema),
});

export const AnimeScreenshotsSchema = z.object({
  data: z.object({
    animes: z.array(AnimeScreenshotsDataSchema),
  }),
});
