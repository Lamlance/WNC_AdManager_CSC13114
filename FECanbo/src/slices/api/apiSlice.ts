import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsReqResponse,
  GetAllAdsResponse,
  GetAllReportsResponse,
} from "../../types/response";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllReportsRequest,
} from "../../types/request";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/api" }),
  endpoints: (builder) => ({
    getAllAdsInfo: builder.query<GetAllAdsResponse, GetAllAdsRequest | void>({
      query: () => "/quang-cao",
    }),
    getAnAdsInfo: builder.query({
      query: (id) => `/quang-cao/${id}`,
    }),
    getAllAdsReq: builder.query<
      GetAllAdsReqResponse,
      GetAllAdsReqRequest | void
    >({
      query: () => "/yeu-cau-cap-phep",
    }),
    getAnAdsRequest: builder.query({
      query: (id) => `/yeu-cau-cap-phep/${id}`,
    }),
    getAllReportInfo: builder.query<
      GetAllReportsResponse,
      GetAllReportsRequest | void
    >({
      query: () => "/bao-cao",
    }),
    getAReportInfo: builder.query({
      query: (id) => `/bao-cao/${id}`,
    }),
  }),
});

export const {
  useGetAllAdsInfoQuery,
  useGetAllReportInfoQuery,
  useSubmitAdRequestMutation,
} = apiSlice;
export const { reducer } = apiSlice;
