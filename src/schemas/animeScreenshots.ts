import { z } from "zod";

export const AnimeScreenshotSchema = z.object({
  id: z.string(),
  x332Url: z.string().url(),
  x166Url: z.string().url(),
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
