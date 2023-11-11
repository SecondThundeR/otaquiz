import z from "zod";

import { AnimeScreenshotSchema } from "./animeScreenshots";

const AnimeDataSchema = z.object({
  id: z.string(),
  russian: z.string().nullable(),
  screenshots: z.array(AnimeScreenshotSchema),
});

const AnimeDataGenresSchema = z.object({
  genres: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const AnimeDataWithGenresSchema = AnimeDataSchema.merge(AnimeDataGenresSchema);

export const AnimesSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataWithGenresSchema),
  }),
});

export const AnimesNonScreenshotSchema = z.object({
  data: z.object({
    animes: z.array(AnimeDataSchema.omit({ screenshots: true })),
  }),
});

export type FilteredAnime = Omit<
  z.infer<typeof AnimeDataWithGenresSchema>,
  "russian"
> & {
  russian: string;
};

export type FilteredAnimeNonScreenshot = Omit<
  z.infer<typeof AnimeDataSchema>,
  "screenshots" | "russian"
> & { russian: string };

export type Animes = z.infer<typeof AnimeDataSchema>[];
