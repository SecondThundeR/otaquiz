import type { inferProcedureInput } from "@trpc/server";
import { describe, expect, it } from "vitest";

import { type AppRouter, appRouter } from "@/server/api/root";
import { createCallerFactory, createInnerTRPCContext } from "@/server/api/trpc";

import { animeIds, decoysResult } from "../__mocks__/animes";
import { emptySession, exampleSession } from "../__mocks__/session";

describe("Anime Router", () => {
  describe("getAnswerDecoys", () => {
    it("should be able to get anime decoys for unauthed user", async () => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)(ctx);

      const input: inferProcedureInput<AppRouter["anime"]["getAnswerDecoys"]> = {
        animeIds,
      };

      const example = await caller.anime.getAnswerDecoys(input);

      expect(example).toMatchObject(decoysResult);
    });

    it("should be able to get anime decoys for authed user", async () => {
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

  describe("getAnimeScreenshots", () => {
    it("should be able to get anime screenshots for unauthed user", async () => {
      const ctx = createInnerTRPCContext(emptySession);
      const caller = createCallerFactory(appRouter)(ctx);

      const input: inferProcedureInput<AppRouter["anime"]["getAnimeScreenshots"]> = {
        animeIds,
      };

      const animeScreenshots = await caller.anime.getAnimeScreenshots(input);
      const firstScreenshot = animeScreenshots?.at(0);

      expect(firstScreenshot?.id).toBe(animeIds);
      expect(firstScreenshot?.screenshots.length).toBe(6);
    });

    it("should be able to get anime screenshots for authed user", async () => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)(ctx);

      const input: inferProcedureInput<AppRouter["anime"]["getAnimeScreenshots"]> = {
        animeIds,
      };

      const animeScreenshots = await caller.anime.getAnimeScreenshots(input);
      const firstScreenshot = animeScreenshots?.at(0);

      expect(firstScreenshot?.id).toBe(animeIds);
      expect(firstScreenshot?.screenshots.length).toBe(6);
    });

    it("should return different array on slice amount parameter", async () => {
      const ctx = createInnerTRPCContext(exampleSession);
      const caller = createCallerFactory(appRouter)(ctx);

      const input: inferProcedureInput<AppRouter["anime"]["getAnimeScreenshots"]> = {
        animeIds,
        sliceAmount: 1,
      };

      const animeScreenshots = await caller.anime.getAnimeScreenshots(input);
      const firstScreenshot = animeScreenshots?.at(0);

      expect(firstScreenshot?.id).toBe(animeIds);
      expect(firstScreenshot?.screenshots.length).toBe(1);
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

      const input: inferProcedureInput<AppRouter["anime"]["getAnimeScreenshots"]> = {
        animeIds: "",
      };

      const example = caller.anime.getAnimeScreenshots(input);

      await expect(example).rejects.toThrow();
    });
  });
});
