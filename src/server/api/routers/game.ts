import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { gameQuery } from "@/constants/graphQLQueries";
import { SHIKIMORI_GRAPHQL_API_URL } from "@/constants/links";

import { AnimesSchema, type Animes } from "@/schemas/animes";
import { DBAnswerArraySchema } from "@/schemas/db/answers";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { getRandomElement } from "@/utils/array/getRandomElement";
import { getGraphQLFetchOptions } from "@/utils/query/getGraphQLFetchOptions";
import { getSelectedIDs } from "@/utils/query/getSelectedIDs";
import { processError } from "@/utils/trpc/processError";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(
      z.object({
        options: z.object({
          limit: z.number().min(1).max(50),
          kind: z.string().nullish(),
          status: z.string().nullish(),
          score: z.number().min(1).max(9).nullish(),
          duration: z.string().nullish(),
          rating: z.string().nullish(),
          censored: z.boolean().nullish(),
        }),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input: { options } }) => {
      const { limit: amount } = options;
      const selectedAnimes: Animes = [];

      try {
        do {
          const res = await fetch(
            SHIKIMORI_GRAPHQL_API_URL,
            getGraphQLFetchOptions(gameQuery, {
              ...options,
              limit: amount >= 20 ? amount : 20,
              excludeIds: getSelectedIDs(selectedAnimes),
            }),
          );

          if (!res.ok) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Shikimori API returned response with non-200 status code",
            });
          }

          const parsedAnimes = (await AnimesSchema.parseAsync(await res.json()))
            .data.animes;

          if (parsedAnimes.length === 0) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Can't fetch amount of required data with provided options. Try again!",
            });
          }

          const filteredAnimes = parsedAnimes.filter(
            (data) =>
              data.screenshots.length > 0 &&
              data.genres.length > 0 &&
              !!data.russian,
          );
          selectedAnimes.push(
            ...filteredAnimes.slice(0, amount - selectedAnimes.length),
          );
        } while (selectedAnimes.length < amount);

        const gameAnimes = selectedAnimes.map((anime) => {
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
            amount,
            animes: gameAnimes,
            userId: session.user.id,
          },
        });

        return gameData.id;
      } catch (error: unknown) {
        processError(error);
      }
    }),

  getGameInfo: publicProcedure
    .input(z.object({ gameId: z.string().cuid() }))
    .query(async ({ ctx: { prisma }, input: { gameId } }) => {
      try {
        const gameInfo = await prisma.game.findUniqueOrThrow({
          where: {
            id: gameId,
          },
        });

        const userShikimoriInfo = await prisma.user.findUnique({
          where: {
            id: gameInfo?.userId,
          },
          select: {
            name: true,
            accounts: {
              where: {
                provider: "shikimori",
              },
              select: {
                providerAccountId: true,
              },
            },
          },
        });

        return {
          ...gameInfo,
          shikimoriId: userShikimoriInfo?.accounts[0]?.providerAccountId,
          userName: userShikimoriInfo?.name,
        };
      } catch (error: unknown) {
        processError(error);
      }
    }),

  updateGameAnswers: protectedProcedure
    .input(
      z.object({
        gameId: z.string().cuid(),
        answers: DBAnswerArraySchema,
        isFinished: z.boolean().default(false),
      }),
    )
    .mutation(
      async ({ ctx: { prisma }, input: { gameId, answers, isFinished } }) => {
        try {
          return await prisma.game.update({
            where: {
              id: gameId,
            },
            data: {
              answers,
              currentAnimeIndex: answers.length,
              isFinished: isFinished,
            },
          });
        } catch (error: unknown) {
          processError(error);
        }
      },
    ),

  deleteGame: protectedProcedure
    .input(z.object({ gameId: z.string().cuid() }))
    .mutation(async ({ ctx: { prisma }, input: { gameId } }) => {
      try {
        const game = await prisma.game.delete({
          where: {
            id: gameId,
          },
        });
        return game.id;
      } catch (error: unknown) {
        processError(error);
      }
    }),
});
