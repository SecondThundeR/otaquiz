import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { AnimeScreenshotsSchema } from "@/schemas/animeScreenshots";
import {
  type Animes,
  AnimesNonScreenshotSchema,
  AnimesSchema,
} from "@/schemas/animes";
import { type DBAnimeArray } from "@/schemas/db/animes";
import { type DBAnswerAnime, DBAnswerArraySchema } from "@/schemas/db/answers";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { getRandomElement } from "@/utils/array/getRandomElement";
import { shuffleValues } from "@/utils/array/shuffleValues";
import { isNotEmpty } from "@/utils/string/isNotEmpty";
import { buildExcludeParams } from "@/utils/trpc/routers/createGame/buildExcludeParams";
import { getSelectedIDs } from "@/utils/trpc/routers/createGame/getSelectedIDs";
import { buildScreenshotsParams } from "@/utils/trpc/routers/getAnimeScreenshots/buildScreenshotsParams";
import { buildDecoyParams } from "@/utils/trpc/routers/getAnswersDecoy/buildDecoyParams";

const SHIKIMORI_GRAPHQL_API_URL = new URL("https://shikimori.me/api/graphql");

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(z.object({ amount: z.number().min(5).max(50) }))
    .mutation(async ({ ctx, input }) => {
      const selectedAnimes: Animes = [];

      try {
        do {
          const res = await fetch(
            SHIKIMORI_GRAPHQL_API_URL,
            buildExcludeParams(getSelectedIDs(selectedAnimes)),
          );
          const parsedAnimes = (await AnimesSchema.parseAsync(await res.json()))
            .data.animes;

          const filteredAnimes = parsedAnimes.filter(
            (data) => data.screenshots.length > 0 && isNotEmpty(data.russian),
          );
          selectedAnimes.push(
            ...filteredAnimes.slice(0, input.amount - selectedAnimes.length),
          );
        } while (selectedAnimes.length < input.amount);

        const gameAnimes: DBAnimeArray = selectedAnimes.map((anime) => {
          const { id, russian, screenshots } = anime;
          const randomScreenshot = getRandomElement(screenshots)!.originalUrl;

          return {
            id,
            name: russian,
            screenshotUrl: randomScreenshot,
          };
        });

        const gameData = await prisma.game.create({
          data: {
            amount: input.amount,
            animes: JSON.stringify(gameAnimes),
            userId: ctx.session.user.id,
          },
        });
        return gameData.id;
      } catch (e: unknown) {
        if (e instanceof z.ZodError) {
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Can't process response from Shikimori API",
            cause: e,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something bad happened while creating a game",
          cause: e,
        });
      }
    }),

  getGameInfo: protectedProcedure
    .input(z.object({ gameId: z.string() }))
    .query(async ({ input }) => {
      const gameInfo = await prisma.game.findUnique({
        where: {
          id: input.gameId,
        },
      });
      if (gameInfo === null)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Can't find game with requested ID",
        });

      return gameInfo;
    }),

  getAnimeScreenshots: protectedProcedure
    .input(
      z.object({
        animeIds: z.string(),
        sliceAmount: z.number().min(1).default(6),
      }),
    )
    .query(async ({ input }) => {
      try {
        const res = await fetch(
          SHIKIMORI_GRAPHQL_API_URL,
          buildScreenshotsParams(input.animeIds),
        );
        const parsedRes = (
          await AnimeScreenshotsSchema.parseAsync(await res.json())
        ).data.animes.map((anime) => {
          return {
            id: anime.id,
            screenshots: shuffleValues(anime.screenshots).slice(
              0,
              input.sliceAmount,
            ),
          };
        });

        return parsedRes;
      } catch (e: unknown) {
        if (e instanceof z.ZodError) {
          console.info(e);
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Can't process response from Shikimori API",
            cause: e,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something bad happened while creating a game",
          cause: e,
        });
      }
    }),

  getAnswerDecoys: protectedProcedure
    .input(
      z.object({
        animeIds: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const animeAmount = input.animeIds.split(",").length;
      const decoyAnimes: DBAnswerAnime[] = [];

      try {
        do {
          const res = await fetch(
            SHIKIMORI_GRAPHQL_API_URL,
            buildDecoyParams(input.animeIds),
          );
          const parsedRes = (
            await AnimesNonScreenshotSchema.parseAsync(await res.json())
          ).data.animes
            .filter((anime) => isNotEmpty(anime.russian))
            .map((anime) => {
              const { id, russian } = anime;
              return { id, name: russian };
            });
          decoyAnimes.push(...parsedRes.slice(0, animeAmount * 3));
        } while (decoyAnimes.length < animeAmount * 3);

        return decoyAnimes;
      } catch (e: unknown) {
        if (e instanceof z.ZodError) {
          console.info(e);
          throw new TRPCError({
            code: "UNPROCESSABLE_CONTENT",
            message: "Can't process response from Shikimori API",
            cause: e,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something bad happened while creating a game",
          cause: e,
        });
      }
    }),

  updateAnswers: protectedProcedure
    .input(
      z.object({
        gameId: z.string(),
        answers: DBAnswerArraySchema,
        isFinished: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.game.update({
        where: {
          id: input.gameId,
        },
        data: {
          answers: JSON.stringify(input.answers),
          currentAnimeIndex: input.answers.length,
          isFinished: input.isFinished,
        },
      });
    }),

  deleteGame: protectedProcedure
    .input(z.object({ gameId: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.game.delete({
        where: {
          id: input.gameId,
        },
      });
    }),
});
