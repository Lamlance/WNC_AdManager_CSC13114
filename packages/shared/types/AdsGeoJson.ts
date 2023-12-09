import z from "zod";

const AdsPropertySchema = z.object({
  name: z.string(),
  address: z.string(),
  land_type: z.string(),
  ad_type: z.string(),
  legal: z.coerce.boolean(),
  panel_type: z.string(),
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
