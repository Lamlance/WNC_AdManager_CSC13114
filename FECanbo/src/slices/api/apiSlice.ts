import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllReportsRequest,
  GetAllAdsMethod,
} from "../../types/request";
import {
  AdChangeApi,
  AdsGeoJson,
  AdsReqApi,
  PlaceChangeApi,
  ReportApi,
} from "@admanager/shared";
import { query } from "express";

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
    getAllAdsMethod: builder.query<
      AdsGeoJson.AdMethodProperty[],
      GetAllAdsMethod | void
    >({
      query: () => "/hinh-thuc-quang-cao",
    }),

    getAllAdsReq: builder.query<
      AdsReqApi.ManyAdsRequestResponse[],
      GetAllAdsReqRequest | void
    >({
      query: () => "/cap-phep-quang-cao",
    }),
    getAllReportInfo: builder.query<
      ReportApi.ReportResponse[],
      GetAllReportsRequest | void
    >({
      query: () => "/bao-cao",
    }),
    getAllAdChangeRequest: builder.query<
      AdChangeApi.AdChangeRequestResponse[],
      void
    >({
      query: () => "/yeu-cau-quang-cao/chinh-sua",
    }),
    submitAdChangeRequest: builder.mutation<
      void,
      AdChangeApi.AdChangeRequestCreate
    >({
      query: (body) => ({
        url: "/yeu-cau-quang-cao/chinh-sua",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitAdRequest: builder.mutation<any, AdsReqApi.AdRequestCreate>({
      query: (formData) => ({
        url: "/cap-phep-quang-cao/",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitAdMethod: builder.mutation<any, AdsGeoJson.AdMethodCreateProperty>({
      query: (formData) => ({
        url: "/hinh-thuc-quang-cao/",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitUpdateAdMethod: builder.mutation<any, AdsGeoJson.AdMethodProperty>({
      query: (body) => ({
        url: `/hinh-thuc-quang-cao/${body.id_htqc}`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getAllPlaceChangeRequest: builder.query<
      PlaceChangeApi.PlaceChangeRequestResponse[],
      void
    >({
      query: () => ({
        url: "dia-diem/chinh-sua",
      }),
    }),

    submitPlaceChangeRequest: builder.mutation<
      any,
      PlaceChangeApi.PlaceChangeRequestCreate
    >({
      query: (body) => ({
        url: "dia-diem/chinh-sua",
        method: "POST",
        body,
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
  useGetAllAdChangeRequestQuery,
  useSubmitAdChangeRequestMutation,
  useGetAllPlaceChangeRequestQuery,
  useSubmitPlaceChangeRequestMutation,
  useGetAllAdsMethodQuery,
  useSubmitAdMethodMutation,
  useSubmitUpdateAdMethodMutation,
} = apiSlice;
