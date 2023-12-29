import z from "zod";
import { PlacePropertySchema } from "./AdsGeoJson.js";
const AdsRequestSchema = z.object({
  id_yeu_cau: z.number(),
  id_diem_dat: z.number().nullish(),
  noi_dung_qc: z.string(),

  ten_cty: z.string(),
  dien_thoai_cty: z.string(),
  email_cty: z.string(),
  dia_chi_cty: z.string(),

  ngay_hieu_luc: z.coerce.date(),
  ngay_het_han: z.coerce.date(),
  trang_thai: z.string().nullish(),
  hinh_anh: z.string().nullish(),
});

const ManyAdsRequestResponseSchema = z.object({
  yeu_cau: AdsRequestSchema,
  dia_diem: PlacePropertySchema.nullish(),
});

const AdRequestCreateSchema = AdsRequestSchema.omit({
  id_yeu_cau: true,
});

const AdRequestUpdateStatusSchema2 = z.object({
  id_yeu_cau: z.number(),
  trang_thai: z.string(),
});

type ManyAdsRequestResponse = z.infer<typeof ManyAdsRequestResponseSchema>;
type AdRequestCreate = z.infer<typeof AdRequestCreateSchema>;

type AdRequestUpdateStatus2 = z.infer<typeof AdRequestUpdateStatusSchema2>;

export {
  ManyAdsRequestResponseSchema,
  AdRequestCreateSchema,
  AdRequestUpdateStatusSchema2,
};
export type { ManyAdsRequestResponse, AdRequestCreate, AdRequestUpdateStatus2 };
