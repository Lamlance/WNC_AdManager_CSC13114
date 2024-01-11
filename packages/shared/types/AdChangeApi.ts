import z from "zod";
import * as AdsGeoJson from "./AdsGeoJson.js";

const AdChangeDataSchema = z
  .object({
    id_loai_bang_qc: z.coerce.number().nullish(),
    id_dia_diem: z.coerce.number().nullish(),
    id_hinh_thuc: z.coerce.number().nullish(),
    id_loai_vitri: z.coerce.number().nullish(),
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

const AdsUpdateDataSchema = AdChangeDataSchema.required({ id_quang_cao: true });
const AdChangeRequestUpdateRespondSchema = AdChangeRequestCreateSchema.merge(
  z.object({
    id_yeu_cau: z.number(),
  })
);
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

const AdCreateBodySchema = AdChangeDataSchema.omit({ id_quang_cao: true })
  .merge(
    z.object({
      id_dia_diem: z.coerce.number(),
      id_loai_bang_qc: z.coerce.number(),
      id_hinh_thuc: z.coerce.number(),
      id_loai_vitri: z.coerce.number(),
      ngay_hieu_luc: z.coerce.date(),
      ngay_het_han: z.coerce.date(),
    })
  )
  .required()
  .partial({
    hinh_1: true,
    hinh_2: true,
  });

type AdChangeRequest = z.infer<typeof AdChangeRequestSchema>;
type AdChangeRequestCreate = z.infer<typeof AdChangeRequestCreateSchema>;
type AdChangeRequestResponse = z.infer<typeof AdChangeRequestResponseSchema>;
type AdChangeStatusRequestUpdate = z.infer<
  typeof AdChangeStatusRequestUpdateSchema
>;
type AdChangeData = z.infer<typeof AdChangeDataSchema>;
type AdCreateBody = z.infer<typeof AdCreateBodySchema>;
type AdChangeRequestUpdateRespond = z.infer<
  typeof AdChangeRequestUpdateRespondSchema
>;
export {
  AdChangeRequestSchema,
  AdChangeDataSchema,
  AdChangeRequestResponseSchema,
  AdChangeRequestCreateSchema,
  AdChangeStatusRequestUpdateSchema,
  AdCreateBodySchema,
  AdsUpdateDataSchema,
  AdChangeRequestUpdateRespondSchema,
};
export type {
  AdChangeRequest,
  AdChangeData,
  AdChangeRequestResponse,
  AdChangeRequestCreate,
  AdChangeStatusRequestUpdate,
  AdCreateBody,
  AdChangeRequestUpdateRespond,
};
