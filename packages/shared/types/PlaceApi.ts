import z from "zod";

const PlaceSchema = z.object({
    id_dia_diem: z.number(),
    id_ban_do: z.string().default("null"),
    ten_dia_diem: z.string(),
    dia_chi: z.string(),
    lng: z.number(),
    lat: z.number(),
    id_phuong: z.number(),
});

type PlaceProperty = z.infer<typeof PlaceSchema>;

export type { PlaceProperty };
export { PlaceSchema };
