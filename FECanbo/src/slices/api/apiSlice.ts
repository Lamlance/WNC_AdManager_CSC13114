import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllReportsRequest,
  GetAllAdsMethod,
  GetAllReportsType,
  GetAllDistrict,
} from "../../types/request";
import {
  AdChangeApi,
  AdsGeoJson,
  AdsReqApi,
  PlaceChangeApi,
  ReportApi,
  PlaceApi,
} from "@admanager/shared";
import { RootState } from "../../store";

type WardItem = {
  phuong: { id_phuong: number; ten_phuong: string; id_quan: number };
  quan: { id_quan: number; ten_quan: string };
};
type GetAllWardArgs = { id_quan?: number[] };
type GetAllPlaceArgs = { id_phuong?: number };
type GetALLReportInfoArgs = { phuong_id?: number[] };
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4030/api",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    //call report method from backend
    getAllReportsType: builder.query<ReportApi.ReportTypeProperty[], GetAllReportsType | void>({ query: () => "/loai-bao-cao"}),

    getAllAdsReq: builder.query<
      AdsReqApi.ManyAdsRequestResponse[],
      GetAllAdsReqRequest | void
    >({
      query: () => "/cap-phep-quang-cao",
    }),
    getAllReportInfo: builder.query<
      ReportApi.ReportResponse[],
      GetALLReportInfoArgs
    >({
      query: ({ phuong_id }) => ({
        url: "/bao-cao",
        params: { phuong_id },
      }),
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
    submitAdRequest: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/cap-phep-quang-cao/",
        method: "POST",
        body: formData,
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
    
    //submit new report method to backend
    submitCreateReportType: builder.mutation<any, ReportApi.ReportTypeProperty>({ 
      query: (formData) => ({
        url: "/loai-bao-cao",
        method: "POST",
        body: formData,
        headers: {
          "Content_Type": "application/json",
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
    
    //submit update report method to backend
    submitUpdateReportType: builder.mutation<any, ReportApi.ReportTypeProperty>({
      query: (body) => ({
        url: `/loai-bao-cao/${body.id_loai_bc}`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteAdMethod: builder.mutation<any, AdsGeoJson.AdMethodDeleteProperty>({
      query: (data) => ({
        url: `/hinh-thuc-quang-cao/${data.id_htqc}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    //submit delete report method to back end
    deleteReportType: builder.mutation<any, ReportApi.ReportTypeProperty>({
      query: (data) => ({
        url: `/loai-bao-cao/${data.id_loai_bc}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    submitUpdateAdRequestStatus: builder.mutation<
      any,
      AdsReqApi.AdRequestUpdateStatus2
    >({
      query: (body) => ({
        url: `/cap-phep-quang-cao/${body.id_yeu_cau}`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitUpdateAdChangeRequestStatus: builder.mutation<
      any,
      AdChangeApi.AdChangeStatusRequestUpdate
    >({
      query: (body) => ({
        url: `/yeu-cau-quang-cao/chinh-sua/${body.id_yeu_cau}`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    //place info 
    getAllDistrict: builder.query<PlaceApi.DistrictProperty[], GetAllDistrict | void>({
      query: () => ({ url: "/quan", }),
    }),
    getAllWard2: builder.query<PlaceApi.WardProperty[], number>({
      query: (id_quan) => ({ url: `/phuong/thuoc/${id_quan}` }),
    }),
    getAllPlace: builder.query<PlaceApi.PlaceProperty[], number>({
      query: (id_phuong) => ({ url: `/dia-diem/thuoc/${id_phuong}` }),
    }),
    submitCreatePlace: builder.mutation<any, PlaceApi.PlaceProperty>({ 
      query: (formData) => ({
        url: "/dia-diem",
        method: "POST",
        body: formData,
        headers: {
          "Content_Type": "application/json",
        },
      }),
    }),
    submitUpdatePlace: builder.mutation<any, PlaceApi.PlaceProperty>({
      query: (body) => ({
        url: `/dia-diem`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deletePlace: builder.mutation<any, PlaceApi.PlaceProperty>({
      query: (data) => ({
        url: `/dia-diem`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    //end place info

    //place change request
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
    getImageUrl: builder.query<{ url: string }, string>({
      query: (img_name) => `/image/${img_name}`,
    }),
    getAllWard: builder.query<WardItem[], GetAllWardArgs>({
      query: ({ id_quan }) => ({
        url: "public/phuong",
        params: { id_quan },
      }),
    })
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
  useSubmitUpdateAdRequestStatusMutation,
  useSubmitUpdateAdChangeRequestStatusMutation,
  useDeleteAdMethodMutation,

  useGetAllReportsTypeQuery,
  useSubmitCreateReportTypeMutation,
  useSubmitUpdateReportTypeMutation,
  useDeleteReportTypeMutation,

  useGetImageUrlQuery,
  useLazyGetImageUrlQuery,

  useLazyGetAllReportInfoQuery: useLazyGetAllReportInfo,
  useGetAllWardQuery: useGetAllWards,
  useLazyGetAllWardQuery: useLazyGetAllWards,

  useGetAllDistrictQuery,
  useGetAllWard2Query,
  useGetAllPlaceQuery,
  useSubmitCreatePlaceMutation,
  useSubmitUpdatePlaceMutation,
  useDeletePlaceMutation,


} = apiSlice;