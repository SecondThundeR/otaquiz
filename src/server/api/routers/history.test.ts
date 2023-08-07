import { afterEach, describe, expect, it, vi } from "vitest";

import prisma from "@/server/__mocks__/db";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";

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

const gameHistoryMock = [
  {
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
  },
];

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
    prisma.game.findMany.mockResolvedValueOnce(gameHistoryMock);

    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller({ ...ctx, prisma: prisma });

    const example = await caller.history.getGameHistory(undefined);

    expect(example).toMatchObject(gameHistoryMock);
  });
});
