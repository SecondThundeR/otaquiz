import { afterEach, describe, expect, it, vi } from "vitest";

import prisma from "@/server/__mocks__/db";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";

import { gameDataMock } from "./game.test";

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

describe("History Router Test (getGameHistory route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should not be able to get game history", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller(ctx);

    const example = caller.history.getGameHistory(undefined);

    await expect(example).rejects.toThrow();
  });

  it("authed user should be able to get game history", async () => {
    prisma.game.findMany.mockResolvedValueOnce([gameDataMock]);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.history.getGameHistory(undefined);

    expect(example).toMatchObject([gameDataMock]);
  });
});
