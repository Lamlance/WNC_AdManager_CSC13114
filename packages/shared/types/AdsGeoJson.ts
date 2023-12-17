import z from "zod";

const AdsPropertySchema = z.object({
  quy_hoach: z.coerce.boolean(),

  ngay_hieu_luc: z.string().nullish(),
  ngay_het_han: z.string().nullish(),

  hinh_1: z.string().nullish(),
  hinh_2: z.string().nullish(),

  so_luong: z.number().nullish().default(1),
  chieu_dai_m: z.number().nullish(),
  chieu_rong_m: z.number().nullish(),

  loai_vitri: z.string(),
  hinh_thuc: z.string(),
  ten_dia_diem: z.string(),
  dia_chi: z.string(),

  bang_qc: z.string(),
});

type AdsProperty = z.infer<typeof AdsPropertySchema>;

type AdsGeoJsonFeature = {
  type: "Feature";
  properties: {
    ads: AdsProperty[];
  };
  geometry: {
    type: "Point";
    coordinates: [number, number, 0];
  };
};

type AdsGeoJson = {
  type: "FeatureCollection";
  crs: {
    type: "name";
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" };
  };
  features: AdsGeoJsonFeature[];
};

export type { AdsProperty, AdsGeoJsonFeature, AdsGeoJson };
export { AdsPropertySchema };
