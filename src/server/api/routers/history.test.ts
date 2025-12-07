import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";
import { games, users } from "@/server/db/schema";
import { dbTest } from "~/tests/fixtures";
import { gameDataMock } from "../__mocks__/gameData";

const emptySession = { session: null };

const exampleSession = {
  session: {
    user: {
      id: "123",
      name: "Test",
    },
    expires: "1",
  },
};

describe("History Router", () => {
  describe("getGameHistory", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should not be able to get game history for unauthed user", async () => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)(ctx);

      const example = caller.history.getGameHistory(undefined);

      await expect(example).rejects.toThrow();
    });

    dbTest("should be able to get game history for authed user", async ({ db }) => {
      await db.insert(users).values({
        id: "123",
      });

      const [gameData] = await db.insert(games).values(gameDataMock).returning({
        id: games.id,
        amount: games.amount,
        animes: games.animes,
        answers: games.answers,
        createdAt: games.createdAt,
      });

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.history.getGameHistory(undefined);

      expect(example).toMatchObject([gameData]);
    });
  });
});
