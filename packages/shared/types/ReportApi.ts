import z from "zod";

const ReportFormValuesSchema = z.object({
  id_loai_bc: z.coerce.number(),
  ten_nguoi_gui: z.string(),
  email: z.string().nullish(),
  dien_thoai: z.string().nullish(),
  noi_dung: z.string(),
});

const ReportPlaceSchema = z.object({
  ten_dia_diem: z.string(),
  dia_chi: z.string(),
  id_phuong: z.number().nullish(),
  id_dia_diem: z.number().nullish(),
  place_id: z.string().nullish(),
  lng: z.number(),
  lat: z.number(),
});

const ReportCreateSchema = z
  .object({
    id_quang_cao: z.string().nullish(),
  })
  .merge(ReportPlaceSchema)
  .merge(ReportFormValuesSchema);

const ReportResponseSchema = z.object({
  bao_cao: z
    .object({
      id_bao_cao: z.number(),
      trang_thai: z.string(),
      thoi_diem_bc: z.date(),
    })
    .merge(ReportCreateSchema.omit({ ten_dia_diem: true })),
  loai_bc: z.string(),
});


const ReportTypeSchema = z.object({
  id_loai_bao_cao: z.coerce.number(),
  ten_loai_bao_cao: z.string(),
});


type ReportCreateBody = z.infer<typeof ReportCreateSchema>;
type ReportFormValues = z.infer<typeof ReportFormValuesSchema>;
type ReportPlace = z.infer<typeof ReportPlaceSchema>;
type ReportResponse = z.infer<typeof ReportResponseSchema>;
type ReportType = z.infer<typeof ReportTypeSchema>;

export type { ReportResponse, ReportCreateBody, ReportFormValues, ReportPlace, ReportType };
export { ReportCreateSchema, ReportFormValuesSchema, ReportPlaceSchema, ReportTypeSchema };
