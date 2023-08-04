import z from "zod";

import { AnimeScreenshotSchema } from "./animeScreenshots";

const AnimeDataSchema = z.object({
  id: z.string(),
  russian: z.string(),
  screenshots: z.array(AnimeScreenshotSchema),
});

const AnimeDataGenresSchema = z.object({
  genres: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export const AnimesSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataSchema.merge(AnimeDataGenresSchema)),
  }),
});

export const AnimesNonScreenshotSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataSchema.omit({ screenshots: true })),
  }),
});

export type Animes = z.infer<typeof AnimeDataSchema>[];
