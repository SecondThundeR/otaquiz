import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export function processError(error: unknown) {
  if (error instanceof ZodError) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "Can't process response from Shikimori API",
      cause: error,
    });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something happened while working with the database. Try again",
      cause: error,
    });
  if (error instanceof TRPCError) throw error;

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Oops... something happened on our side, we are already working on it!",
    cause: error,
  });
}
