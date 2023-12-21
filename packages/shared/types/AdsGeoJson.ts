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
const AdsGeoJsonPropertySchema = z.object({
  ads: z.preprocess(StringParsePreprocess, z.array(AdsPropertySchema).min(1)),
  place: z.preprocess(StringParsePreprocess, PlacePropertySchema),
});

const ReportFormValuesSchema = z.object({
  reportType: z.string(),
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  description: z.string(),
});
const ReportPlaceSchema = PlacePropertySchema.omit({ id_dia_diem: true });
const ReportGeoJsonPropertySchema = z.preprocess(
  StringParsePreprocess,
  ReportFormValuesSchema.merge(ReportPlaceSchema)
);

type AdsProperty = z.infer<typeof AdsPropertySchema>;
type PlaceProperty = z.infer<typeof PlacePropertySchema>;
type AdsGeoJsonProperty = z.infer<typeof AdsGeoJsonPropertySchema>;

type ReportFormValues = z.infer<typeof ReportFormValuesSchema>;
type ReportPlace = z.infer<typeof ReportPlaceSchema>;
type ReportGeoJsonProperty = z.infer<typeof ReportGeoJsonPropertySchema>;

type GeoJsonProperty<P extends object> = {
  type: "Feature";
  properties: P;
  geometry: {
    type: "Point";
    coordinates: [number, number, 0];
  };
};

type GeoJson<P extends object> = {
  type: "FeatureCollection";
  crs: {
    type: "name";
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" };
  };
  features: GeoJsonProperty<P>[];
};

type AdsGeoJson = GeoJson<AdsGeoJsonProperty>;
type ReportGeoJson = GeoJson<ReportGeoJsonProperty>;

export type {
  AdsProperty,
  PlaceProperty,
  AdsGeoJsonProperty,
  AdsGeoJson,
  ReportFormValues,
  ReportPlace,
  ReportGeoJsonProperty,
  ReportGeoJson,
};
export {
  AdsPropertySchema,
  PlacePropertySchema,
  AdsGeoJsonPropertySchema,
  ReportFormValuesSchema,
  ReportPlaceSchema,
  ReportGeoJsonPropertySchema,
};
