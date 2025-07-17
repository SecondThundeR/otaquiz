import { afterEach, describe, expect, it, vi } from "vitest";
import { prisma as prismaMock } from "@/mocks/prisma";
import { appRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";

import { gameDataMock } from "../__mocks__/gameData";

vi.mock("../../db");

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

    it("should be able to get game history for authed user", async () => {
      prismaMock.game.findMany.mockResolvedValueOnce([gameDataMock]);

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        prisma: prismaMock,
      });

      const example = await caller.history.getGameHistory(undefined);

      expect(example).toMatchObject([gameDataMock]);
    });
  });
});
