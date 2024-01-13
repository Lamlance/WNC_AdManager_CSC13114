import z from "zod";
export const LandTypeSchema = z.object({
  id_loai_vt: z.number(),
  loai_vitri: z.string(),
});
export const GetAllLandTypeResponseSchema = z.object({
  vi_tri: LandTypeSchema,
});
export type LandType = z.infer<typeof LandTypeSchema>;
export type GetAllLandTypeResponse = z.infer<
  typeof GetAllLandTypeResponseSchema
>;
