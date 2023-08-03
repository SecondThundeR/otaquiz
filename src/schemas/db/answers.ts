import z from "zod";

import { DBAnimeSchema } from "./animes";

const DBAnswerAnimeSchema = DBAnimeSchema.omit({ screenshotUrl: true });

const DBAnswerSchema = z.object({
  correct: DBAnswerAnimeSchema.nullable(),
  picked: DBAnswerAnimeSchema,
});

export const DBAnswerArraySchema = z.array(DBAnswerSchema);

export type DBAnswer = z.infer<typeof DBAnswerSchema>;
export type DBAnswerAnime = z.infer<typeof DBAnswerAnimeSchema>;
export type DBAnswerArray = z.infer<typeof DBAnswerArraySchema>;
