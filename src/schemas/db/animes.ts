import z from "zod";

export const DBAnimeSchema = z.object({
  id: z.string(),
  name: z.string(),
  screenshotUrl: z.string().url(),
});

export const DBAnimeArraySchema = z.array(DBAnimeSchema);

export type DBAnime = z.infer<typeof DBAnimeSchema>;
export type DBAnimeArray = z.infer<typeof DBAnimeArraySchema>;
