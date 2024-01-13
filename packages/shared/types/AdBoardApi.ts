import z from "zod";
export const AdsBoardSchema = z.object({
  id_loai_bang_qc: z.number(),
  loai_bang_qc: z.string(),
});

export const GetAllBoardTypeResponseSchema = z.object({
  bang_qc: AdsBoardSchema,
});

export type AdsBoard = z.infer<typeof AdsBoardSchema>;
export type GetAllBoardTypeResponse = z.infer<
  typeof GetAllBoardTypeResponseSchema
>;
