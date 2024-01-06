import z from "zod";
export const GetImageQuerySchema = z.object({
  filename: z.string(),
  bkname: z.union([z.literal("adsrequest"), z.literal("adsreports")]),
});
export const GetImageQueryResponseSchema = z.object({
  url: z.string(),
});

export type GetImageQuery = z.infer<typeof GetImageQuerySchema>;
export type GetImageQueryResponse = z.infer<typeof GetImageQueryResponseSchema>;
