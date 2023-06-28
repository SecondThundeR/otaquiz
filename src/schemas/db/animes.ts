import z from "zod";

export const DBAnimeSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const DBAnimeArraySchema = z.array(DBAnimeSchema);
