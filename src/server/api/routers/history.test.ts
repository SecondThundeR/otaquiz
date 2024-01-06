import { afterEach, describe, expect, it, vi } from "vitest";

import { appRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";

import { prisma as prismaMock } from "@/mocks/prisma";

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

describe("History Router Test (getGameHistory route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should not be able to get game history", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = createCallerFactory(appRouter)(ctx);

    const example = caller.history.getGameHistory(undefined);

    await expect(example).rejects.toThrow();
  });

  it("authed user should be able to get game history", async () => {
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
