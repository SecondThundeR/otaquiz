import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, it } from "vitest";

import { appRouter, type AppRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";

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

const animeIds = "53050";

const decoysResult = [
  {
    id: "1",
    name: "Аниме 1",
  },
  {
    id: "2",
    name: "Аниме 2",
  },
  {
    id: "3",
    name: "Аниме 3",
  },
];

describe("Anime Router Test (getAnswerDecoys route)", () => {
  it("unauthed user should be able to get anime decoys", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
      animeIds,
    };

    const example = await caller.anime.getAnswerDecoys(input);

    expect(example).toMatchObject(decoysResult);
  });

  it("authed user should be able to get anime decoys", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
      animeIds,
    };

    const example = await caller.anime.getAnswerDecoys(input);

    expect(example).toMatchObject(decoysResult);
  });

  it("should fail on empty input", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const example = caller.anime.getAnswerDecoys(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on empty string", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
      animeIds: "",
    };

    const example = caller.anime.getAnswerDecoys(input);

    await expect(example).rejects.toThrow();
  });
});

describe("Anime Router Test (getAnimeScreenshots route)", () => {
  it("unauthed user should be able to get anime screenshots", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<
      AppRouter["anime"]["getAnimeScreenshots"]
    > = {
      animeIds,
    };

    const animeScreenshots = (await caller.anime.getAnimeScreenshots(
      input,
    ))![0]!;

    expect(animeScreenshots.id).toBe(animeIds);
    expect(animeScreenshots.screenshots.length).toBe(6);
  });

  it("authed user should be able to get anime screenshots", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<
      AppRouter["anime"]["getAnimeScreenshots"]
    > = {
      animeIds,
    };

    const animeScreenshots = (await caller.anime.getAnimeScreenshots(
      input,
    ))![0]!;

    expect(animeScreenshots.id).toBe(animeIds);
    expect(animeScreenshots.screenshots.length).toBe(6);
  });

  it("should return different array on slice amount parameter", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<
      AppRouter["anime"]["getAnimeScreenshots"]
    > = {
      animeIds,
      sliceAmount: 1,
    };

    const animeScreenshots = (await caller.anime.getAnimeScreenshots(
      input,
    ))![0]!;

    expect(animeScreenshots.id).toBe(animeIds);
    expect(animeScreenshots.screenshots.length).toBe(1);
  });

  it("should fail on empty input", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const example = caller.anime.getAnimeScreenshots(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on empty string", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = appRouter.createCaller(ctx);

    const input: inferProcedureInput<
      AppRouter["anime"]["getAnimeScreenshots"]
    > = {
      animeIds: "",
    };

    const example = caller.anime.getAnimeScreenshots(input);

    await expect(example).rejects.toThrow();
  });
});
