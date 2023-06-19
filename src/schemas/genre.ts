import z from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
  russian: z.string(),
  kind: z.nullable(z.string()),
});
