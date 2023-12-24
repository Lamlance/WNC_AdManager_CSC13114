import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllReportsRequest,
} from "../../types/request";
import { AdsGeoJson, AdsReqApi, ReportApi } from "@admanager/shared";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/api" }),
  endpoints: (builder) => ({
    getAllAdsInfo: builder.query<
      AdsGeoJson.AdsGeoJsonProperty[],
      GetAllAdsRequest | void
    >({
      query: () => "/quang-cao",
    }),
    getAnAdsInfo: builder.query({
      query: (id) => `/quang-cao/${id}`,
    }),
    getAllAdsReq: builder.query<
      AdsReqApi.ManyAdsRequestResponse[],
      GetAllAdsReqRequest | void
    >({
      query: () => "/yeu-cau-cap-phep",
    }),
    getAnAdsRequest: builder.query({
      query: (id) => `/yeu-cau-cap-phep/${id}`,
    }),
    getAllReportInfo: builder.query<
      ReportApi.ReportResponse[],
      GetAllReportsRequest | void
    >({
      query: () => "/bao-cao",
    }),
    submitAdRequest: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/yeu-cau-bao-cao",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllAdsInfoQuery,
  useGetAllReportInfoQuery,
  useSubmitAdRequestMutation,
  useGetAllAdsReqQuery,
} = apiSlice;
