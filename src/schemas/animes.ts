import z from "zod";

import { AnimeScreenshotSchema } from "./animeScreenshots";

export const AnimeDataSchema = z.object({
  id: z.string(),
  russian: z.string(),
  screenshots: z.array(AnimeScreenshotSchema),
});

export const AnimesSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataSchema),
  }),
});

export const AnimesNonScreenshotSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataSchema.omit({ screenshots: true })),
  }),
});

export type Animes = z.infer<typeof AnimesSchema>["data"]["animes"];
export type AnimesNonScreenshot = z.infer<
  typeof AnimesNonScreenshotSchema
>["data"]["animes"];
