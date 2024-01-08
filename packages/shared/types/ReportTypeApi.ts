import z from "zod";
export const ReportTypeSchema = z.object({
  id_loai_bc: z.number(),
  loai_bao_cao: z.string(),
});

export const GetAllReportTypeResponseSchema = z.object({
  loai_bc: ReportTypeSchema,
});

export type ReportType = z.infer<typeof ReportTypeSchema>;
export type GetAllReportTypeResponse = z.infer<
  typeof GetAllReportTypeResponseSchema
>;
