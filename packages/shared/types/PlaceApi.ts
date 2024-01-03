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
    id_ban_do: z.string().default("null"),
    ten_dia_diem: z.string(),
    dia_chi: z.string(),
    lng: z.number(),
    lat: z.number(),
    id_phuong: z.number(),
});

type DistrictProperty = z.infer<typeof DistrictSchema>;
type WardProperty = z.infer<typeof WardSchema>;
type PlaceProperty = z.infer<typeof PlaceSchema>;

export type { DistrictProperty, WardProperty, PlaceProperty };
export { DistrictSchema, WardSchema, PlaceSchema };
