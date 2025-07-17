import { TRPCError } from "@trpc/server";

export function checkForEmptyAnimes<T>(array: T[]) {
  if (array.length > 0) return;

  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Can't fetch necessary amount of required data with provided options. Try again!",
  });
}
