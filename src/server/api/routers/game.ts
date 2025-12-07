import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { gameQuery } from "@/constants/graphQLQueries";
import { SHIKIMORI_GRAPHQL_API_URL } from "@/constants/links";
import { type Animes, AnimesSchema, type FilteredAnime } from "@/schemas/animes";
import { DBAnswerArraySchema } from "@/schemas/db/answers";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { accounts, games, users } from "@/server/db/schema";
import { getRandomElement } from "@/utils/array/getRandomElement";
import { getGraphQLFetchOptions } from "@/utils/query/getGraphQLFetchOptions";
import { getSelectedIDs } from "@/utils/query/getSelectedIDs";
import { checkForEmptyAnimes } from "@/utils/trpc/checkForEmptyAnimes";
import { checkForFailedRes } from "@/utils/trpc/checkForFailedRes";
import { processError } from "@/utils/trpc/processError";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(
      z.object({
        options: z.object({
          limit: z.number().min(1).max(50),
          kind: z.string().nullish(),
          status: z.string().nullish(),
          season: z.string().nullish(),
          score: z.number().min(1).max(9).nullish(),
          duration: z.string().nullish(),
          rating: z.string().nullish(),
          censored: z.boolean().nullish(),
          isShowingResult: z.boolean().default(false),
        }),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input: { options } }) => {
      const { limit: amount, isShowingResult } = options;
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
          checkForFailedRes(res);

          const parsedAnimes = (await AnimesSchema.parseAsync(await res.json())).data.animes;
          checkForEmptyAnimes(parsedAnimes);

          const filteredAnimes = parsedAnimes.filter(
            (data): data is FilteredAnime =>
              data.screenshots.length > 0 && data.genres.length > 0 && !!data.russian,
          );
          selectedAnimes.push(...filteredAnimes.slice(0, amount - selectedAnimes.length));
        } while (selectedAnimes.length < amount);

        const gameAnimes = selectedAnimes.map((anime) => {
          const { id, russian, screenshots } = anime;
          const randomScreenshot = getRandomElement(screenshots)?.originalUrl;

          return {
            id,
            name: russian,
            screenshotUrl: randomScreenshot,
          };
        });

        const [gameData] = await db
          .insert(games)
          .values({
            amount,
            animes: gameAnimes,
            userId: session.user.id,
            isShowingResult,
          })
          .returning({ id: games.id });

        if (!gameData) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return gameData.id;
      } catch (error: unknown) {
        processError(error);
      }
    }),

  getGameInfo: publicProcedure
    .input(z.object({ gameId: z.uuid() }))
    .query(async ({ ctx: { db }, input: { gameId } }) => {
      try {
        const [gameInfo] = await db.select().from(games).where(eq(games.id, gameId)).limit(1);

        if (!gameInfo) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        const userRows = await db
          .select({
            userName: users.name,
            providerAccountId: accounts.providerAccountId,
          })
          .from(users)
          .leftJoin(
            accounts,
            and(eq(accounts.userId, users.id), eq(accounts.provider, "shikimori")),
          )
          .where(eq(users.id, gameInfo.userId));

        const userRow = userRows[0];

        const userShikimoriInfo = userRow
          ? {
              name: userRow.userName,
              accounts: userRow.providerAccountId
                ? [{ providerAccountId: userRow.providerAccountId }]
                : [],
            }
          : null;

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
        gameId: z.uuid(),
        answers: DBAnswerArraySchema,
        isFinished: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx: { db }, input: { gameId, answers, isFinished } }) => {
      try {
        const [updatedGame] = await db
          .update(games)
          .set({
            answers,
            currentAnimeIndex: answers.length,
            isFinished,
          })
          .where(eq(games.id, gameId))
          .returning();

        return updatedGame;
      } catch (error: unknown) {
        processError(error);
      }
    }),

  deleteGame: protectedProcedure
    .input(z.object({ gameId: z.uuid() }))
    .mutation(async ({ ctx: { db }, input: { gameId } }) => {
      try {
        const [game] = await db
          .delete(games)
          .where(eq(games.id, gameId))
          .returning({ id: games.id });

        return game?.id;
      } catch (error: unknown) {
        processError(error);
      }
    }),
});
