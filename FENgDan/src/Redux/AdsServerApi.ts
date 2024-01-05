import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdsServerApi = createApi({
  reducerPath: "AdsServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/" }),
  endpoints: (builder) => ({
    uploadReport: builder.mutation<AdsGeoJson.ReportGeoJsonProperty, FormData>({
      query: (body) => ({ url: "/api/bao-cao", method: "POST", body }),
    }),
    getAdsGeoJson: builder.query<AdsGeoJson.AdsGeoJson, void>({
      query: () => ({ url: "/geojson" }),
    }),
    getReportGeoJson: builder.query<AdsGeoJson.ReportGeoJson, void>({
      query: () => ({ url: "/geojson/report" }),
    }),
  }),
});

export const {
  useUploadReportMutation: uploadReportData,
  useGetAdsGeoJsonQuery: useGetAdsGeoJson,
  useGetReportGeoJsonQuery: useGetReportGeoJson,
  useLazyGetAdsGeoJsonQuery: useLazyGetAdsGeoJson,
  useLazyGetReportGeoJsonQuery: useLazyGetReportGeoJson,
} = AdsServerApi;
export default AdsServerApi;
