import { TRPCError } from "@trpc/server";

export function checkForEmptyAnimes(array: unknown[]) {
  if (array.length === 0)
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Can't fetch necessary amount of required data with provided options. Try again!",
    });
  return;
}
