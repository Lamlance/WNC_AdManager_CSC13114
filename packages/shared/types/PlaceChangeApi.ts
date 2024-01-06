import z from "zod";
import { PlaceSchema } from "./PlaceApi";

// const PlaceChangeRequestResponseSchema = z.object({
//   id_yeu_cau: z.number(),
//   id_dia_diem: z.number().nullish(),
//   lng: z.number().nullish(),
//   lat: z.number().nullish(),
//   ten_dia_diem: z.string().nullish(),
//   dia_chi: z.string().nullish(),
//   ly_do_chinh_sua: z.string(),
// });

// const PlaceChangeRequestCreateSchema = PlaceChangeRequestResponseSchema.omit({
//   id_yeu_cau: true,
// });

// type PlaceChangeRequestResponse = z.infer<
//   typeof PlaceChangeRequestResponseSchema
// >;
// type PlaceChangeRequestCreate = z.infer<typeof PlaceChangeRequestCreateSchema>;

// export { PlaceChangeRequestResponseSchema, PlaceChangeRequestCreateSchema };
// export type { PlaceChangeRequestResponse, PlaceChangeRequestCreate };

// import * as Place from "./PlaceApi"

const PlaceChangeDataSchema = z.object({
  ten_dia_diem: z.string().nullish(),
  dia_chi: z.string().nullish(),
  lng: z.number().nullish(),
  lat: z.number().nullish(),
})
//.merge(Place.PlaceSchema.partial());

// const PlaceChangeRequestCreateSchema = z.object({
//   ly_do_chinh_sua: z.string(),
//   id_dia_diem: z.number(),
//   thong_tin_sua: PlaceChangeDataSchema,
// });

// const PlaceChangeStatusRequestUpdateSchema = z.object({
//   id_yeu_cau: z.number(),
//   trang_thai: z.string(),
// });
const PlaceChangeRequestResponseSchema = z.object({
  id_yeu_cau: z.number().nullish(),
  id_dia_diem: z.number().nullable(),
  ly_do_chinh_sua: z.string().nullish(),
  thong_tin_sua: PlaceChangeDataSchema.nullable(),
  thong_tin_hien_tai: PlaceSchema.nullable(),
  thoi_diem_chinh_sua: z.date(),
  trang_thai: z.string(),
})
// .merge(PlaceChangeRequestCreateSchema);

const PlaceChangeRequestCreateSchema = PlaceChangeRequestResponseSchema.omit({
  id_yeu_cau: true,
});


type PlaceChangeRequestResponse = z.infer<typeof PlaceChangeRequestResponseSchema>;
type PlaceChangeRequestCreate = z.infer<typeof PlaceChangeRequestCreateSchema>;
// type PlaceChangeRequestResponse = z.infer<typeof PlaceChangeRequestResponseSchema>;
// type PlaceChangeStatusRequestUpdate = z.infer<typeof PlaceChangeStatusRequestUpdateSchema>;
type PlaceChangeData = z.infer<typeof PlaceChangeDataSchema>;

export { PlaceChangeRequestResponseSchema, PlaceChangeRequestCreateSchema, PlaceChangeDataSchema };
export type { PlaceChangeRequestResponse, PlaceChangeRequestCreate, PlaceChangeData };

// export {
//   PlaceChangeRequestSchema,
//   PlaceChangeDataSchema,
//   // PlaceChangeRequestResponseSchema,
//   // PlaceChangeRequestCreateSchema,
//   // PlaceChangeStatusRequestUpdateSchema,
// };
// export type {
//   PlaceChangeRequest,
//   PlaceChangeData,
//   // PlaceChangeRequestResponse,
//   // PlaceChangeRequestCreate,
//   // PlaceChangeStatusRequestUpdate,
// };
