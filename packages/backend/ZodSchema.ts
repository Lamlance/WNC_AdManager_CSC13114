import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as AdsSchema from "./db/schema.js";
import z from "zod";
const createBaoCaoSchema = z.object({
  ten_nguoi_gui: z.string(),
  email: z.string().nullish(),
  dien_thoai: z.string().nullish(),
  noi_dung: z.string(),
  trang_thai: z.string().nullish(),
  thoi_diem_bc: z.date().nullish(),

  dia_chi: z.string(),
  id_quang_cao: z.string().nullish(),
  id_dia_diem: z.coerce.number().nullish(),

  lng: z.coerce.number(),
  lat: z.coerce.number(),

  hinh_1: z.string().nullish(),
  hinh_2: z.string().nullish(),

  id_loai_bc: z.coerce.number(),
});

export { createBaoCaoSchema };
