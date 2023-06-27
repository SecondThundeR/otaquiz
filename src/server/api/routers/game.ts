import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const gameRouter = createTRPCRouter({
  createGame: protectedProcedure
    .input(z.object({ animeIds: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      await prisma.game.create({
        data: {
          amount: input.animeIds.length,
          animeIds: input.animeIds.join(","),
          userId: ctx.session.user.id,
        },
      });
    }),
});
