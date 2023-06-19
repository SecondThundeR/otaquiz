import z from "zod";

export const ScreenshotSchema = z.object({
  original: z.string(),
  preview: z.string(),
});
