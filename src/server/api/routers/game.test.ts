import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";
import { accounts, games, users } from "@/server/db/schema";
import { dbTest } from "~/tests/fixtures";
import { accountDataMock } from "../__mocks__/accountData";
import { createGameDataMock, gameDataMock } from "../__mocks__/gameData";
import { emptySession, exampleSession } from "../__mocks__/session";
import { userDataMock } from "../__mocks__/userData";

describe("Game Router", () => {
  describe("createGame", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    dbTest("should not be able to create game for unauthed user", async ({ db }) => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = caller.game.createGame({
        options: { limit: 5 },
      });

      await expect(example).rejects.toThrow();
    });

    dbTest("should be able to create game for authed user", async ({ db }) => {
      await db.insert(users).values({
        id: "123",
      });

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.game.createGame({
        options: { limit: 5 },
      });

      expect(example).toBeDefined();
    });

    dbTest("should fail on empty options", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleUndefinedInput = caller.game.createGame(undefined as never);

      await expect(exampleUndefinedInput).rejects.toThrow();

      const exampleUndefinedOptions = caller.game.createGame({
        options: undefined as never,
      });

      await expect(exampleUndefinedOptions).rejects.toThrow();
    });

    dbTest("should fail on incorrect amount range", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleMin = caller.game.createGame({
        options: { limit: 0 },
      });

      await expect(exampleMin).rejects.toThrow();

      const exampleMax = caller.game.createGame({
        options: { limit: 727 },
      });

      await expect(exampleMax).rejects.toThrow();
    });

    dbTest("should fail on incorrect score range", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleMin = caller.game.createGame({
        options: { limit: 5, score: 0 },
      });

      await expect(exampleMin).rejects.toThrow();

      const exampleMax = caller.game.createGame({
        options: { limit: 5, score: 10 },
      });

      await expect(exampleMax).rejects.toThrow();
    });
  });

  describe("getGameInfo", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    dbTest("should be able to get game info for unauthed user", async ({ db }) => {
      await db.insert(users).values(userDataMock);
      await db.insert(accounts).values(accountDataMock);
      await db.insert(games).values(createGameDataMock);

      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.game.getGameInfo({
        gameId: createGameDataMock.id,
      });

      expect(example).toEqual({
        ...createGameDataMock,
        shikimoriId: accountDataMock.providerAccountId,
        userName: userDataMock.name,
      });
    });

    dbTest("should be able to get game info for authed user", async ({ db }) => {
      await db.insert(users).values(userDataMock);
      await db.insert(accounts).values(accountDataMock);
      await db.insert(games).values(createGameDataMock);

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.game.getGameInfo({
        gameId: createGameDataMock.id,
      });

      expect(example).toEqual({
        ...createGameDataMock,
        shikimoriId: accountDataMock.providerAccountId,
        userName: userDataMock.name,
      });
    });

    it("should fail on empty input", async () => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = appRouter.createCaller(ctx);

      const example = caller.game.getGameInfo(undefined as never);

      await expect(example).rejects.toThrow();
    });

    it("should fail on non-cuid input", async () => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = appRouter.createCaller(ctx);

      const exampleNonCUID = caller.game.getGameInfo({
        gameId: "123",
      });

      await expect(exampleNonCUID).rejects.toThrow();
    });

    dbTest("should fail on wrong gameId", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleWrongID = caller.game.getGameInfo({
        gameId: "cll1arbun000008ju3vrp330b",
      });

      await expect(exampleWrongID).rejects.toThrow();
    });
  });

  describe("updateGameAnswers", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    dbTest("should not be able to update game answers for unauthed user", async ({ db }) => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = caller.game.updateGameAnswers({
        gameId: gameDataMock.id,
        answers: [],
        isFinished: false,
      });

      await expect(example).rejects.toThrow();
    });

    dbTest("should be able to update game answers for authed user", async ({ db }) => {
      await db.insert(users).values(userDataMock);
      await db.insert(accounts).values(accountDataMock);
      await db.insert(games).values(gameDataMock);

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.game.updateGameAnswers({
        gameId: gameDataMock.id,
        answers: gameDataMock.answers,
        isFinished: gameDataMock.isFinished,
      });

      const { updatedAt: exampleUpdatedAt, ...exampleRest } = example ?? {};

      const { updatedAt: gameDataUpdatedAt, ...gameDataMockRest } = gameDataMock;

      expect(exampleRest).toEqual(gameDataMockRest);
      expect(exampleUpdatedAt).not.toEqual(gameDataUpdatedAt);
    });

    dbTest("should fail on empty input", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = caller.game.updateGameAnswers(undefined as never);

      await expect(example).rejects.toThrow();
    });

    dbTest("should fail on invalid input", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleEmptyID = caller.game.updateGameAnswers({
        gameId: "",
        answers: [],
      });

      await expect(exampleEmptyID).rejects.toThrow();

      const exampleNonCUID = caller.game.updateGameAnswers({
        gameId: "123",
        answers: [],
      });

      await expect(exampleNonCUID).rejects.toThrow();
    });
  });

  describe("deleteGame", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    dbTest("should not be able to delete game for unauthed user", async ({ db }) => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = caller.game.deleteGame({
        gameId: gameDataMock.id,
      });

      await expect(example).rejects.toThrow();
    });

    dbTest("should be able to delete game for authed user", async ({ db }) => {
      await db.insert(users).values(userDataMock);
      await db.insert(accounts).values(accountDataMock);
      await db.insert(games).values(gameDataMock);

      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = await caller.game.deleteGame({
        gameId: gameDataMock.id,
      });

      expect(example).toBe(gameDataMock.id);
    });

    dbTest("should fail on empty input", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const example = caller.game.deleteGame(undefined as never);

      await expect(example).rejects.toThrow();
    });

    dbTest("should fail on incorrect gameId", async ({ db }) => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)({
        ...ctx,
        db,
      });

      const exampleEmpty = caller.game.deleteGame({ gameId: "" });

      await expect(exampleEmpty).rejects.toThrow();

      const exampleNonCuid = caller.game.deleteGame({ gameId: "123" });

      await expect(exampleNonCuid).rejects.toThrow();
    });
  });
});
