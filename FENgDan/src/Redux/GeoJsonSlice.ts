import { AdsGeoJson } from "@admanager/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GeoJsonApi = createApi({
  reducerPath: "GeoJsonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3070/" }),
  endpoints: (builder) => ({
    getAdsGeoJson: builder.query<AdsGeoJson.AdsGeoJson, void>({
      query: () => ({ url: "/MockMarker.json" }),
    }),
  }),
});

export const {
  useGetAdsGeoJsonQuery: useGetAdsGeoJson,
  useLazyGetAdsGeoJsonQuery: useLazyGetAdsGeoJson,
} = GeoJsonApi;
export default GeoJsonApi;
