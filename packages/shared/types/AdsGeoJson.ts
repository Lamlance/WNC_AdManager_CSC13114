import z from "zod";

function StringParsePreprocess(v: any) {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch (e) {
    console.warn(e);
  }
}

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

const PlacePropertySchema = z.object({
  ten_dia_diem: z.string(),
  dia_chi: z.string(),
  id_phuong: z.number().nullish(),
  id_dia_diem: z.number(),
  place_id: z.string().nullish(),
  lng: z.number(),
  lat: z.number(),
});

const ReportPropertySchema = z.object({
  reportType: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  description: z.string(),
});

const AdsGeoJsonPropertySchema = z.object({
  ads: z.preprocess(StringParsePreprocess, z.array(AdsPropertySchema).min(1)),
  place: z.preprocess(StringParsePreprocess, PlacePropertySchema),
});

type AdsProperty = z.infer<typeof AdsPropertySchema>;
type PlaceProperty = z.infer<typeof PlacePropertySchema>;
type AdsGeoJsonProperty = z.infer<typeof AdsGeoJsonPropertySchema>;
type ReportProperty = z.infer<typeof ReportPropertySchema>;

type AdsGeoJsonFeature = {
  type: "Feature";
  properties: AdsGeoJsonProperty;
  geometry: {
    type: "Point";
    coordinates: [number, number, 0];
  };
};

type ReportGeoJsonFeature = {
  type: "Feature";
  // properties: GeoJsonProperty;
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

type ReportGeoJson = {
  type: "FeatureCollection";
  crs: {
    type: "name";
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" };
  };
  features: AdsGeoJsonFeature[];
};

export type {
  AdsProperty,
  PlaceProperty,
  AdsGeoJsonProperty,
  AdsGeoJsonFeature,
  AdsGeoJson,
};
export { AdsPropertySchema, PlacePropertySchema, AdsGeoJsonPropertySchema };
