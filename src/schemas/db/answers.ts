import z from "zod";

import { DBAnimeSchema } from "./animes";

const DBAnswerAnimeSchema = DBAnimeSchema.omit({ screenshotUrl: true });

export const DBAnswerSchema = z.object({
  correct: DBAnswerAnimeSchema.nullable(),
  picked: DBAnswerAnimeSchema,
});

export const DBAnswerArraySchema = z.array(DBAnswerSchema);

export type DBAnswerAnime = z.infer<typeof DBAnswerAnimeSchema>;
export type DBAnswerArray = z.infer<typeof DBAnswerArraySchema>;
