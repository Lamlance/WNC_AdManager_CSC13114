import z from "zod";

const DistrictSchema = z.object({
  id: z.number(),
  ten_quan: z.string(),
});

const WardSchema = z.object({
  id_phuong: z.number(),
  ten_phuong: z.string(),
  id_quan: z.number(),
});

const PlaceSchema = z.object({
  id_dia_diem: z.number(),
  id_ban_do: z.string().nullish(),
  ten_dia_diem: z.string(),
  dia_chi: z.string(),
  lng: z.number(),
  lat: z.number(),
  id_phuong: z.number().nullish(),
});

const GetAllPlaceResponseSchema = z.object({
  place: PlaceSchema,
});

const UpdatePlaceBodySchema = PlaceSchema.partial().required({
  id_dia_diem: true,
});

const CreatePlaceBodySchema = PlaceSchema.omit({ id_dia_diem: true });

type DistrictProperty = z.infer<typeof DistrictSchema>;
type WardProperty = z.infer<typeof WardSchema>;
type PlaceProperty = z.infer<typeof PlaceSchema>;
type GetAllPlaceResponse = z.infer<typeof GetAllPlaceResponseSchema>;
type UpdatePlaceBody = z.infer<typeof UpdatePlaceBodySchema>;
type CreatePlaceBody = z.infer<typeof CreatePlaceBodySchema>;

export type {
  DistrictProperty,
  WardProperty,
  PlaceProperty,
  GetAllPlaceResponse,
  UpdatePlaceBody,
  CreatePlaceBody,
};
export {
  DistrictSchema,
  WardSchema,
  PlaceSchema,
  GetAllPlaceResponseSchema,
  UpdatePlaceBodySchema,
  CreatePlaceBodySchema,
};
