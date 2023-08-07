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
        amount: z
          .number()
          .min(5)
          .max(50)
          .transform((raw) => raw - (raw % 5)),
      }),
    )
    .mutation(async ({ ctx: { prisma, session }, input: { amount } }) => {
      const selectedAnimes: Animes = [];

      try {
        do {
          const res = await fetch(
            SHIKIMORI_GRAPHQL_API_URL,
            getGraphQLFetchOptions(gameQuery, {
              excludeIds: getSelectedIDs(selectedAnimes),
            }),
          );
          const parsedAnimes = (await AnimesSchema.parseAsync(await res.json()))
            .data.animes;

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
      const gameInfo = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });
      if (gameInfo === null)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Can't find game with requested ID",
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
