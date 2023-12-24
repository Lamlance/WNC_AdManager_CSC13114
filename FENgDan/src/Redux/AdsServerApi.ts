import { AdsGeoJson, ReportApi } from "@admanager/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdsServerApi = createApi({
  reducerPath: "AdsServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/" }),
  endpoints: (builder) => ({
    uploadReport: builder.mutation<
      AdsGeoJson.ReportGeoJsonProperty,
      ReportApi.ReportCreateBody
    >({
      query: (body) => ({ url: "/api/bao-cao", method: "POST", body }),
    }),
  }),
});

export const { useUploadReportMutation: uploadReportData } = AdsServerApi;
export default AdsServerApi;
