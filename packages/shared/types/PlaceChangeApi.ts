import z from "zod";

const PlaceChangeRequestResponseSchema = z.object({
  id_yeu_cau: z.number(),
  id_dia_diem: z.number().nullish(),
  lng: z.number().nullish(),
  lat: z.number().nullish(),
  ten_dia_diem: z.string().nullish(),
  dia_chi: z.string().nullish(),
  ly_do_chinh_sua: z.string(),
  trang_thai: z.string().nullish(),
});

const PlaceChangeRequestCreateSchema = PlaceChangeRequestResponseSchema.omit({
  id_yeu_cau: true,
});

type PlaceChangeRequestResponse = z.infer<
  typeof PlaceChangeRequestResponseSchema
>;
type PlaceChangeRequestCreate = z.infer<typeof PlaceChangeRequestCreateSchema>;

export { PlaceChangeRequestResponseSchema, PlaceChangeRequestCreateSchema };
export type { PlaceChangeRequestResponse, PlaceChangeRequestCreate };
