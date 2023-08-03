import { z } from "zod";

export const AnimeScreenshotSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
});

const AnimeScreenshotsDataSchema = z.object({
  id: z.string(),
  screenshots: z.array(AnimeScreenshotSchema),
});

export const AnimeScreenshotsSchema = z.object({
  data: z.object({
    animes: z.array(AnimeScreenshotsDataSchema),
  }),
});

export type AnimeScreenshots = z.infer<typeof AnimeScreenshotSchema>[];
export type AnimeScreenshotsData = z.infer<typeof AnimeScreenshotsDataSchema>[];
