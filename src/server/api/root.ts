import { animeRouter } from "@/server/api/routers/anime";
import { gameRouter } from "@/server/api/routers/game";
import { historyRouter } from "@/server/api/routers/history";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  game: gameRouter,
  anime: animeRouter,
  history: historyRouter,
});

export type AppRouter = typeof appRouter;
