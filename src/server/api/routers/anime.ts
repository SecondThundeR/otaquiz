import { LRUCache } from "lru-cache";
import { z } from "zod";

import { decoyQuery, screenshotsQuery } from "@/constants/graphQLQueries";
import { SHIKIMORI_GRAPHQL_API_URL } from "@/constants/links";

import { AnimesNonScreenshotSchema } from "@/schemas/animes";
import {
  AnimeScreenshotsSchema,
  type AnimeScreenshotsData,
} from "@/schemas/animeScreenshots";
import { type DBAnswerAnime } from "@/schemas/db/answers";

import { shuffleValues } from "@/utils/array/shuffleValues";
import { getGraphQLFetchOptions } from "@/utils/query/getGraphQLFetchOptions";
import { processError } from "@/utils/trpc/processError";

import { createTRPCRouter, publicProcedure } from "../trpc";

const screenshotsCache = new LRUCache<string, AnimeScreenshotsData>({
  max: 100,
});
const decoysCache = new LRUCache<string, DBAnswerAnime[]>({ max: 100 });

export const animeRouter = createTRPCRouter({
  getAnimeScreenshots: publicProcedure
    .input(
      z.object({
        animeIds: z.string().min(1),
        sliceAmount: z.number().min(1).default(6),
      }),
    )
    .query(async ({ input: { animeIds, sliceAmount } }) => {
      const cacheKey = `${animeIds}-${sliceAmount}`;

      if (screenshotsCache.has(cacheKey)) {
        return screenshotsCache.get(cacheKey);
      }

      try {
        const res = await fetch(
          SHIKIMORI_GRAPHQL_API_URL,
          getGraphQLFetchOptions(screenshotsQuery, { ids: animeIds }),
        );

        const parsedAnimes = (
          await AnimeScreenshotsSchema.parseAsync(await res.json())
        ).data.animes;

        const shuffledScreenshots = parsedAnimes.map((anime) => {
          return {
            id: anime.id,
            screenshots: shuffleValues(anime.screenshots).slice(0, sliceAmount),
          };
        });

        screenshotsCache.set(cacheKey, shuffledScreenshots);

        return shuffledScreenshots;
      } catch (error: unknown) {
        processError(error);
      }
    }),

  getAnswerDecoys: publicProcedure
    .input(
      z.object({
        animeIds: z.string().min(1),
      }),
    )
    .query(async ({ input: { animeIds } }) => {
      const cacheKey = `decoys-${animeIds}`;

      if (decoysCache.has(cacheKey)) {
        return decoysCache.get(cacheKey);
      }

      const animeAmount = animeIds.split(",").length;
      const decoyAnimes: DBAnswerAnime[] = [];

      try {
        do {
          const res = await fetch(
            SHIKIMORI_GRAPHQL_API_URL,
            getGraphQLFetchOptions(decoyQuery, { excludeIds: animeIds }),
          );

          const parsedAnimes = (
            await AnimesNonScreenshotSchema.parseAsync(await res.json())
          ).data.animes;

          const filteredAnimes = parsedAnimes
            .filter((anime) => !!anime.russian)
            .map((anime) => {
              const { id, russian } = anime;
              return { id, name: russian };
            });
          decoyAnimes.push(...filteredAnimes.slice(0, animeAmount * 3));
        } while (decoyAnimes.length < animeAmount * 3);

        decoysCache.set(cacheKey, decoyAnimes);

        return decoyAnimes;
      } catch (error: unknown) {
        processError(error);
      }
    }),
});
