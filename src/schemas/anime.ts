import z from "zod";

import { GenreSchema } from "./genre";
import { ImageSchema } from "./image";
import { ScreenshotSchema } from "./screenshot";
import { StudioSchema } from "./studio";
import {
  UserRateScoreSchema,
  UserRateStatusSchema,
  UserRateSchema,
} from "./userRate";
import { VideoSchema } from "./video";

export const AnimeInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  russian: z.string(),
  image: ImageSchema,
  url: z.string(),
  kind: z.nullable(z.string()),
  score: z.string().transform((score) => Number(score)),
  status: z.string(),
  episodes: z.number(),
  episodes_aired: z.number(),
  aired_on: z.nullable(z.coerce.date()),
  released_on: z.nullable(z.coerce.date()),
});

export const AnimeInfoArraySchema = z.array(AnimeInfoSchema);

export const AnimeSchema = AnimeInfoSchema.extend({
  rating: z.string(),
  english: z.nullable(z.array(z.nullable(z.string()))),
  japanese: z.nullable(z.array(z.nullable(z.string()))),
  synonyms: z.array(z.string()),
  license_name_ru: z.nullable(z.string()),
  duration: z.number(),
  description: z.nullable(z.string()),
  description_html: z.string(),
  description_source: z.nullable(z.string()),
  franchise: z.nullable(z.string()),
  favoured: z.boolean(),
  anons: z.boolean(),
  ongoing: z.boolean(),
  thread_id: z.nullable(z.number()),
  topic_id: z.nullable(z.number()),
  myanimelist_id: z.number(),
  rates_scores_stats: z.array(UserRateScoreSchema),
  rates_statuses_stats: z.array(UserRateStatusSchema),
  updated_at: z.coerce.date(),
  next_episode_at: z.nullable(z.coerce.date()),
  fansubbers: z.array(z.string()),
  fandubbers: z.array(z.string()),
  licensors: z.array(z.string()),
  genres: z.array(GenreSchema),
  studios: z.array(StudioSchema),
  videos: z.array(VideoSchema),
  screenshots: z.array(ScreenshotSchema),
  user_rate: z.nullable(UserRateSchema),
});

export const AnimeArraySchema = z.array(AnimeSchema);
