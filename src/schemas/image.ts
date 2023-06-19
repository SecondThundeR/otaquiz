import z from "zod";

export const ImageSchema = z.object({
  original: z.string(),
  preview: z.string(),
  x96: z.string(),
  x48: z.string(),
});
