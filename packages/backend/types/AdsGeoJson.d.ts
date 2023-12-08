type AdsProperty = {
  name: string;
  address: string;
  land_type: string;
  ad_type: string;
  legal: boolean;
  panel_type: string;
};

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
