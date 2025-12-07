import { and, asc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { games } from "@/server/db/schema";
import { processError } from "@/utils/trpc/processError";

export const historyRouter = createTRPCRouter({
  getGameHistory: protectedProcedure.query(async ({ ctx: { db, session } }) => {
    try {
      return await db
        .select({
          id: games.id,
          amount: games.amount,
          animes: games.animes,
          answers: games.answers,
          createdAt: games.createdAt,
        })
        .from(games)
        .where(and(eq(games.userId, session.user.id), eq(games.isFinished, true)))
        .orderBy(asc(games.createdAt));
    } catch (error: unknown) {
      processError(error);
    }
  }),
});
