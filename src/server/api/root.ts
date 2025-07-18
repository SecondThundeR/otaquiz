import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { animeRouter } from "./routers/anime";
import { gameRouter } from "./routers/game";
import { historyRouter } from "./routers/history";

export const appRouter = createTRPCRouter({
  game: gameRouter,
  anime: animeRouter,
  history: historyRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
