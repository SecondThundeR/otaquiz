import { gameRouter } from "@/server/api/routers/game";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  game: gameRouter,
});

export type AppRouter = typeof appRouter;
