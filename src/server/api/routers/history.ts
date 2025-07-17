import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { processError } from "@/utils/trpc/processError";

export const historyRouter = createTRPCRouter({
  getGameHistory: protectedProcedure.query(async ({ ctx: { prisma, session } }) => {
    try {
      return await prisma.game.findMany({
        where: {
          userId: session.user.id,
          isFinished: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
          amount: true,
          animes: true,
          answers: true,
          createdAt: true,
        },
      });
    } catch (error: unknown) {
      processError(error);
    }
  }),
});
