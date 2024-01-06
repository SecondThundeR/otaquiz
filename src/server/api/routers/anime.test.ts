import { type inferProcedureInput } from "@trpc/server";
import { describe, expect, it } from "vitest";

import { appRouter, type AppRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";

import { animeIds, decoysResult } from "../__mocks__/animes";
import { emptySession, exampleSession } from "../__mocks__/session";

describe("Anime Router Test (getAnswerDecoys route)", () => {
  it("unauthed user should be able to get anime decoys", async () => {
    const ctx = createInnerTRPCContext(emptySession);
    const caller = createCallerFactory(appRouter)(ctx);

    const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
      animeIds,
    };

    const example = await caller.anime.getAnswerDecoys(input);

    expect(example).toMatchObject(decoysResult);
  });

  it("authed user should be able to get anime decoys", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = createCallerFactory(appRouter)(ctx);

    const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
      animeIds,
    };

    const example = await caller.anime.getAnswerDecoys(input);

    expect(example).toMatchObject(decoysResult);
  });

  it("should fail on empty input", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = createCallerFactory(appRouter)(ctx);

    const example = caller.anime.getAnswerDecoys(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on empty string", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = createCallerFactory(appRouter)(ctx);

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
    const caller = createCallerFactory(appRouter)(ctx);

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
    const caller = createCallerFactory(appRouter)(ctx);

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
    const caller = createCallerFactory(appRouter)(ctx);

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
    const caller = createCallerFactory(appRouter)(ctx);

    const example = caller.anime.getAnimeScreenshots(undefined as never);

    await expect(example).rejects.toThrow();
  });

  it("should fail on empty string", async () => {
    const ctx = createInnerTRPCContext(exampleSession);
    const caller = createCallerFactory(appRouter)(ctx);

    const input: inferProcedureInput<
      AppRouter["anime"]["getAnimeScreenshots"]
    > = {
      animeIds: "",
    };

    const example = caller.anime.getAnimeScreenshots(input);

    await expect(example).rejects.toThrow();
  });
});
