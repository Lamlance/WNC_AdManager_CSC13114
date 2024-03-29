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
  id_phuong: z.coerce.number().nullish(),
  id_dia_diem: z.coerce.number().nullish(),
  place_id: z.coerce.string().nullish(),
  lng: z.coerce.number(),
  lat: z.coerce.number(),
});

const ReportCreateSchema = z
  .object({
    id_quang_cao: z.string().nullish(),
    hinh_1: z.string().nullish(),
    hinh_2: z.string().nullish(),
  })
  .merge(ReportPlaceSchema)
  .merge(ReportFormValuesSchema);

const ReportSchema = z
  .object({
    id_bao_cao: z.number(),
    trang_thai: z.string(),
    thoi_diem_bc: z.coerce.date(),
    phan_hoi: z.string().nullish(),
  })
  .merge(ReportCreateSchema.omit({ ten_dia_diem: true }));

const ReportResponseSchema = z.object({
  bao_cao: ReportSchema,
  loai_bc: z.string(),
});

const ReportTypeSchema = z.object({
  id_loai_bao_cao: z.coerce.number(),
  ten_loai_bao_cao: z.string(),
});

const ReportUpdateSchema = z.object({
  id_bao_cao: z.number(),
  phan_hoi: z.string(),
  trang_thai: z.string(),
});

type ReportCreateBody = z.infer<typeof ReportCreateSchema>;
type ReportFormValues = z.infer<typeof ReportFormValuesSchema>;
type ReportPlace = z.infer<typeof ReportPlaceSchema>;
type ReportResponse = z.infer<typeof ReportResponseSchema>;
type ReportType = z.infer<typeof ReportTypeSchema>;
type ReportUpdate = z.infer<typeof ReportUpdateSchema>;
type Report = z.infer<typeof ReportSchema>;
export type {
  ReportResponse,
  ReportCreateBody,
  ReportFormValues,
  ReportPlace,
  ReportType,
  ReportUpdate,
  Report,
};
export {
  ReportCreateSchema,
  ReportFormValuesSchema,
  ReportPlaceSchema,
  ReportTypeSchema,
  ReportUpdateSchema,
  ReportResponseSchema,
  ReportSchema,
};
