import { afterEach, describe, expect, it, vi } from "vitest";

import prisma from "@/server/__mocks__/db";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";

vi.mock("../../db");

const emptySession = {
  session: null,
};

const exampleSession = {
  session: {
    user: {
      id: "123",
      name: "Test",
    },
    expires: "1",
  },
};

const gameDataMock = {
  id: "cll17jrnk000008l7bdc8bspm",
  amount: 5,
  animes: [
    {
      id: "3363",
      name: "Реал Драйв",
      screenshotUrl:
        "https://desu.shikimori.me/system/screenshots/original/935e379767c7689be32ab15bb0862c61a8a896dc.jpg?1596828551",
    },
    {
      id: "50002",
      name: "Нулевой Эдем 2",
      screenshotUrl:
        "https://desu.shikimori.me/system/screenshots/original/04dd03963c44c1bece2baaab8504f80080c915e1.jpg?1680375024",
    },
    {
      id: "48471",
      name: "Луна, Лайка и Носферату",
      screenshotUrl:
        "https://desu.shikimori.me/system/screenshots/original/50258708add70b5a89e5cc08776cc464176c46c3.jpg?1633420294",
    },
    {
      id: "11597",
      name: "Истории подделок",
      screenshotUrl:
        "https://desu.shikimori.me/system/screenshots/original/6eb8d72b30fdb4c67031b69d0683cb536feb1905.jpg?1677995074",
    },
    {
      id: "36539",
      name: "Прекрасна, как Луна: Спецвыпуск",
      screenshotUrl:
        "https://desu.shikimori.me/system/screenshots/original/b077879df5120ec021c5d98def2e288970ee2086.jpg?1580040967",
    },
  ],
  answers: [
    {
      picked: {
        id: "3363",
        name: "Реал Драйв",
      },
      correct: null,
    },
    {
      picked: {
        id: "23327",
        name: "Космический Денди 2",
      },
      correct: {
        id: "50002",
        name: "Нулевой Эдем 2",
      },
    },
    {
      picked: {
        id: "51500",
        name: "Евробойс",
      },
      correct: {
        id: "48471",
        name: "Луна, Лайка и Носферату",
      },
    },
    {
      picked: {
        id: "53136",
        name: "Перепелиные прятки",
      },
      correct: {
        id: "11597",
        name: "Истории подделок",
      },
    },
    {
      picked: {
        id: "47616",
        name: "Обещанный Неверленд 2: Рекап",
      },
      correct: {
        id: "36539",
        name: "Прекрасна, как Луна: Спецвыпуск",
      },
    },
  ],
  currentAnimeIndex: 5,
  isFinished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "123",
};

const createGameDataMock = {
  ...gameDataMock,
  id: "cll183wn6000008mtf2waez94",
  animes: gameDataMock.animes,
  answers: null,
  currentAnimeIndex: 0,
  isFinished: false,
};

const userDataMock = {
  id: createGameDataMock.userId,
  name: "Test",
  email: null,
  emailVerified: null,
  image: null,
};

const accountDataMock = {
  id: "cll18wtlm000008la2tz7dhpl",
  userId: createGameDataMock.userId,
  type: "oauth",
  provider: "shikimori",
  providerAccountId: "123123",
  refresh_token: "refresh_token",
  access_token: "access_token",
  expires_at: 1,
  created_at: 1,
  token_type: "Bearer",
  scope: "user_rates comments topics",
  id_token: null,
  session_state: null,
};

const userAccountMock = {
  name: userDataMock.name,
  accounts: [{ providerAccountId: accountDataMock.providerAccountId }],
};

describe("Game Router Test (createGame route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should not be able to create game", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = caller.game.createGame({
      amount: 5,
    });

    await expect(example).rejects.toThrow();
  });

  it("authed user should be able to create game", async () => {
    prisma.game.create.mockResolvedValueOnce(createGameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.game.createGame({
      amount: 5,
    });

    expect(example).toBe(createGameDataMock.id);
  });

  it("should create game with incorrect number in range", async () => {
    prisma.game.create.mockResolvedValueOnce(createGameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.game.createGame({
      amount: 7, // Will be transformed to 5
    });

    expect(example).toBe(createGameDataMock.id);
  });

  it("should fail on incorrect amount range", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const exampleMin = caller.game.createGame({
      amount: 1,
    });

    await expect(exampleMin).rejects.toThrow();

    const exampleMax = caller.game.createGame({
      amount: 999,
    });

    await expect(exampleMax).rejects.toThrow();
  });
});

describe("Game Router Test (getGameInfo route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should be able to get game info", async () => {
    prisma.game.findUniqueOrThrow.mockResolvedValueOnce(createGameDataMock);
    // @ts-expect-error This findUnique returns accounts data
    prisma.user.findUnique.mockResolvedValueOnce(userAccountMock);

    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.game.getGameInfo({
      gameId: createGameDataMock.id,
    });

    expect(example).toEqual({
      ...createGameDataMock,
      shikimoriId: accountDataMock.providerAccountId,
      userName: userDataMock.name,
    });
  });

  it("authed user should be able to get game info", async () => {
    prisma.game.findUniqueOrThrow.mockResolvedValueOnce(createGameDataMock);
    // @ts-expect-error This findUnique returns accounts data
    prisma.user.findUnique.mockResolvedValueOnce(userAccountMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

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

  it("should fail on wrong gameId", async () => {
    prisma.game.findUniqueOrThrow.mockRejectedValueOnce(null);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const exampleWrongID = caller.game.getGameInfo({
      gameId: "cll1arbun000008ju3vrp330b",
    });

    await expect(exampleWrongID).rejects.toThrow();
  });
});

describe("Game Router Test (updateGameAnswers route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should not be able to update game answers", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = caller.game.updateGameAnswers({
      gameId: gameDataMock.id,
      answers: [],
      isFinished: false,
    });

    await expect(example).rejects.toThrow();
  });

  it("authed user should be able to update game answers", async () => {
    prisma.game.update.mockResolvedValueOnce(gameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.game.updateGameAnswers({
      gameId: gameDataMock.id,
      answers: gameDataMock.answers,
      isFinished: gameDataMock.isFinished,
    });

    expect(example).toEqual(gameDataMock);
  });

  it("should fail on empty input", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = caller.game.updateGameAnswers(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on invalid input", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

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

describe("Game Router Test (deleteGame route)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("unauthed user should not be able to delete game", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = caller.game.deleteGame({
      gameId: gameDataMock.id,
    });

    await expect(example).rejects.toThrow();
  });

  it("authed user should be able to delete game", async () => {
    prisma.game.create.mockResolvedValueOnce(gameDataMock);
    prisma.game.delete.mockResolvedValueOnce(gameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.game.deleteGame({
      gameId: gameDataMock.id,
    });

    expect(example).toBe(gameDataMock.id);
  });

  it("should fail on empty input", async () => {
    prisma.game.create.mockResolvedValueOnce(gameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = caller.game.deleteGame(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on incorrect gameId", async () => {
    prisma.game.create.mockResolvedValueOnce(gameDataMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const exampleEmpty = caller.game.deleteGame({ gameId: "" });

    await expect(exampleEmpty).rejects.toThrow();

    const exampleNonCuid = caller.game.deleteGame({ gameId: "123" });

    await expect(exampleNonCuid).rejects.toThrow();
  });
});
