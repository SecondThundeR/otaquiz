import z from "zod";
import { DBAnimeSchema } from "./animes";

export const DBAnswerSchema = z.object({
  correct: DBAnimeSchema.nullable(),
  picked: DBAnimeSchema,
});

export const DBAnswerArraySchema = z.array(DBAnswerSchema);

export type DBAnswerArray = z.infer<typeof DBAnswerArraySchema>;
