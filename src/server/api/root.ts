import { animeRouter } from "@/server/api/routers/anime";
import { gameRouter } from "@/server/api/routers/game";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  game: gameRouter,
  anime: animeRouter,
});

export type AppRouter = typeof appRouter;
