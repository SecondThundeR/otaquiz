import z from "zod";

export const StudioSchema = z.object({
  id: z.number(),
  name: z.string(),
  filtered_name: z.string(),
  real: z.boolean(),
  image: z.nullable(z.string()),
});
