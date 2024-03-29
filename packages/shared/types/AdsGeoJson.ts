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
  id_quang_cao: z.string(),
  quy_hoach: z.coerce.boolean(),

  ngay_hieu_luc: z.string().or(z.date()).nullish(),
  ngay_het_han: z.string().or(z.date()).nullish(),

  hinh_1: z.string().nullish(),
  hinh_2: z.string().nullish(),

  so_luong: z.coerce.number().nullish().default(1),
  chieu_dai_m: z.coerce.number().nullish(),
  chieu_rong_m: z.coerce.number().nullish(),

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

const ReportPropertySchema = z.object({
  id_dia_diem: z.number().nullish(),
  dia_chi: z.string(),
  lng: z.number(),
  lat: z.number(),
  id_quang_cao: z.string().nullish(),
  id_loai_bc: z.coerce.number().nullish(),
  id_bao_cao: z.number(),
  ten_nguoi_gui: z.string(),
  email: z.string().nullish(),
  dien_thoai: z.string().nullish(),
  noi_dung: z.string(),
  trang_thai: z.string(),
  thoi_diem_bc: z.date().or(z.string()),
  phan_hoi: z.string().nullish(),
});

const ReportGeoJsonPropertySchemaRaw = z.object({
  bao_cao: z.preprocess(StringParsePreprocess, ReportPropertySchema),
  loai_bao_cao: z.string(),
  dia_diem: z.preprocess(StringParsePreprocess, PlacePropertySchema.nullish()),
  quang_cao: z.preprocess(
    StringParsePreprocess,
    AdsPropertySchema.omit({
      loai_vitri: true,
      hinh_thuc: true,
      bang_qc: true,
    }).nullish()
  ),
});

const ReportGeoJsonPropertySchema = z.preprocess(
  StringParsePreprocess,
  ReportGeoJsonPropertySchemaRaw
);

const AdMethodSchema = z.object({
  id_htqc: z.number(),
  hinh_thuc_qc: z.string(),
});

const AdMethodCreateSchema = AdMethodSchema.omit({
  id_htqc: true,
});
const AdMethodUpdateSchema = AdMethodSchema.omit({
  id_htqc: true,
});
const AdmethodDeleteSchema = z.object({
  id_htqc: z.number(),
});

type AdsProperty = z.infer<typeof AdsPropertySchema>;
type PlaceProperty = z.infer<typeof PlacePropertySchema>;
type AdsGeoJsonProperty = z.infer<typeof AdsGeoJsonPropertySchema>;
type ReportGeoJsonProperty = z.infer<typeof ReportGeoJsonPropertySchema>;
type AdMethodProperty = z.infer<typeof AdMethodSchema>;
type AdMethodCreateProperty = z.infer<typeof AdMethodCreateSchema>;
type AdMethodUpdateProperty = z.infer<typeof AdMethodUpdateSchema>;
type AdMethodDeleteProperty = z.infer<typeof AdmethodDeleteSchema>;

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
const AdsGeoJsonSchema = z.object({
  type: z.literal("FeatureCollection"),
  crs: z.object({
    type: z.literal("name"),
    properties: z.object({ name: z.literal("urn:ogc:def:crs:OGC:1.3:CRS84") }),
  }),

  features: z.preprocess(
    StringParsePreprocess,
    z
      .object({
        type: z.literal("Feature"),
        properties: AdsGeoJsonPropertySchema,
        geometry: z.object({
          type: z.literal("Point"),
          coordinates: z.number().array(),
        }),
      })
      .array()
  ),
});
type AdsGeoJson = z.infer<typeof AdsGeoJsonSchema>;
type ReportGeoJson = GeoJson<ReportGeoJsonProperty[]>;

export type {
  AdsProperty,
  PlaceProperty,
  AdsGeoJsonProperty,
  AdsGeoJson,
  ReportGeoJsonProperty,
  ReportGeoJson,
  AdMethodProperty,
  AdMethodCreateProperty,
  AdMethodUpdateProperty,
  AdMethodDeleteProperty,
};

export {
  AdsPropertySchema,
  PlacePropertySchema,
  AdsGeoJsonPropertySchema,
  ReportGeoJsonPropertySchema,
  AdMethodSchema,
  AdMethodCreateSchema,
  AdMethodUpdateSchema,
  AdmethodDeleteSchema,
  AdsGeoJsonSchema,
};
