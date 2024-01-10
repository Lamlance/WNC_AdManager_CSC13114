import z from "zod";
import * as AdsGeoJson from "./AdsGeoJson.js";

const AdChangeDataSchema = z
  .object({
    id_loai_bang_qc: z.number().nullish(),
    id_dia_diem: z.number().nullish(),
    id_hinh_thuc: z.number().nullish(),
    id_loai_vitri: z.number().nullish(),
  })
  .merge(
    AdsGeoJson.AdsPropertySchema.omit({
      loai_vitri: true,
      bang_qc: true,
      hinh_thuc: true,
    }).partial()
  );

const AdChangeRequestCreateSchema = z.object({
  ly_do_chinh_sua: z.string(),
  id_quang_cao: z.string(),
  thong_tin_sua: AdChangeDataSchema,
});

const AdChangeStatusRequestUpdateSchema = z.object({
  id_yeu_cau: z.number(),
  trang_thai: z.string(),
});
const AdChangeRequestSchema = z
  .object({
    id_yeu_cau: z.number(),
    thoi_diem_chinh_sua: z.coerce.date(),
    trang_thai: z.string(),
    id_quang_cao: z.string(),
  })
  .merge(AdChangeRequestCreateSchema);

const AdChangeRequestResponseSchema = z.object({
  chinh_sua: AdChangeRequestSchema,
  thong_tin_qc: AdsGeoJson.AdsPropertySchema,
  dia_diem: AdsGeoJson.PlacePropertySchema,
});

type AdChangeRequest = z.infer<typeof AdChangeRequestSchema>;
type AdChangeRequestCreate = z.infer<typeof AdChangeRequestCreateSchema>;
type AdChangeRequestResponse = z.infer<typeof AdChangeRequestResponseSchema>;
type AdChangeStatusRequestUpdate = z.infer<
  typeof AdChangeStatusRequestUpdateSchema
>;
type AdChangeData = z.infer<typeof AdChangeDataSchema>;

export {
  AdChangeRequestSchema,
  AdChangeDataSchema,
  AdChangeRequestResponseSchema,
  AdChangeRequestCreateSchema,
  AdChangeStatusRequestUpdateSchema,
};
export type {
  AdChangeRequest,
  AdChangeData,
  AdChangeRequestResponse,
  AdChangeRequestCreate,
  AdChangeStatusRequestUpdate,
};
