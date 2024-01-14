import {
  AdsGeoJson,
  ImageApi,
  ReportApi,
  ReportTypeApi,
} from "@admanager/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdsServerApi = createApi({
  reducerPath: "AdsServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/" }),
  endpoints: (builder) => ({
    uploadReport: builder.mutation<AdsGeoJson.ReportGeoJsonProperty, FormData>({
      query: (body) => ({ url: "/api/public/report", method: "POST", body }),
    }),
    getAdsGeoJson: builder.query<AdsGeoJson.AdsGeoJson, void>({
      query: () => ({ url: "/geojson" }),
    }),
    getReportGeoJson: builder.query<AdsGeoJson.ReportGeoJson, void>({
      query: () => ({ url: "/geojson/report" }),
    }),
    getAllReportType: builder.query<
      { data: ReportTypeApi.GetAllReportTypeResponse[] },
      void
    >({
      query: () => ({ url: "/api/public/loai-bc" }),
    }),
    getImageFromName: builder.query<{ url?: string }, ImageApi.GetImageQuery>({
      query: (params) => ({ url: "/api/image", params }),
    }),
  }),
});

export const {
  useUploadReportMutation: uploadReportData,
  useGetAdsGeoJsonQuery: useGetAdsGeoJson,
  useGetReportGeoJsonQuery: useGetReportGeoJson,
  useLazyGetAdsGeoJsonQuery: useLazyGetAdsGeoJson,
  useLazyGetReportGeoJsonQuery: useLazyGetReportGeoJson,
  useGetAllReportTypeQuery: useGetAllReportType,
  useLazyGetAllReportTypeQuery: useLazyGetAllReportType,
  useGetImageFromNameQuery: useGetImageFromName,
  useLazyGetImageFromNameQuery: useLazyGetImageFromName,
} = AdsServerApi;
export default AdsServerApi;
