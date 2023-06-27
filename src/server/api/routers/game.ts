import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { AnimeInfoArraySchema } from "@/schemas/anime";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

const SHIKIMORI_API_URL = "https://shikimori.me/api/";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(z.object({ amount: z.number().min(5).max(50) }))
    .mutation(async ({ ctx, input }) => {
      const animesUrl = new URL("animes", SHIKIMORI_API_URL);
      animesUrl.searchParams.append("limit", String(input.amount));
      animesUrl.searchParams.append("order", "random");

      const res = await fetch(animesUrl);

      try {
        const parsedAnimes = await AnimeInfoArraySchema.parseAsync(
          await res.json()
        );
        const animeData = parsedAnimes.map((anime) => {
          return {
            id: anime.id,
            name: anime.russian || anime.name,
          };
        });

        const gameData = await prisma.game.create({
          data: {
            amount: input.amount,
            animes: JSON.stringify(animeData),
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

  getGame: protectedProcedure
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

  getRandomAnimes: protectedProcedure
    .input(z.object({ animeId: z.number() }))
    .query(async ({ input }) => {
      const animesUrl = new URL("animes", SHIKIMORI_API_URL);
      animesUrl.searchParams.append("limit", "3");
      animesUrl.searchParams.append("order", "random");
      animesUrl.searchParams.append("exclude_ids", String(input.animeId));

      const res = await fetch(animesUrl);

      try {
        const animes = await AnimeInfoArraySchema.parseAsync(await res.json());
        return animes.map((anime) => {
          return {
            id: anime.id,
            name: anime.russian || anime.name,
          };
        });
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
          message: "Something bad happened while getting random animes",
          cause: e,
        });
      }
    }),
});
