import { TRPCError } from "@trpc/server";

export function checkForFailedRes(res: Response) {
  if (!res.ok) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Shikimori API returned response with non-200 status code",
    });
  }
  return;
}
