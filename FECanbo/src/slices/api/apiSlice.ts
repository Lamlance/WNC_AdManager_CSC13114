import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllAdsMethod,
} from "../../types/request";
import {
  AdChangeApi,
  AdsGeoJson,
  AdsReqApi,
  AuthApi,
  ImageApi,
  PlaceChangeApi,
  ReportApi,
} from "@admanager/shared";
import { RootState } from "../../store";

type WardItem = {
  phuong: { id_phuong: number; ten_phuong: string; id_quan: number };
  quan: { id_quan: number; ten_quan: string };
};
type GetAllWardArgs = { id_quan?: number[] };
type GetALLReportInfoArgs = { phuong_id?: number[] };
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4030/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.authToken;
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
      query: () => "api/quang-cao",
    }),
    getAllAdsMethod: builder.query<
      AdsGeoJson.AdMethodProperty[],
      GetAllAdsMethod | void
    >({
      query: () => "api/hinh-thuc-quang-cao",
    }),

    getAllAdsReq: builder.query<
      AdsReqApi.ManyAdsRequestResponse[],
      GetAllAdsReqRequest | void
    >({
      query: () => "api/cap-phep-quang-cao",
    }),
    getAllReportInfo: builder.query<
      ReportApi.ReportResponse[],
      GetALLReportInfoArgs
    >({
      query: ({ phuong_id }) => ({
        url: "api/bao-cao",
        params: { phuong_id },
      }),
    }),
    updateReportStatus: builder.mutation<
      ReportApi.ReportResponse["bao_cao"],
      ReportApi.ReportUpdate
    >({
      query: (body) => ({
        url: "/bao-cao",
        method: "PUT",
        body: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAllAdChangeRequest: builder.query<
      AdChangeApi.AdChangeRequestResponse[],
      void
    >({
      query: () => "api/yeu-cau-quang-cao/chinh-sua",
    }),
    submitAdChangeRequest: builder.mutation<
      void,
      AdChangeApi.AdChangeRequestCreate
    >({
      query: (body) => ({
        url: "api/yeu-cau-quang-cao/chinh-sua",
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitAdRequest: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "api/cap-phep-quang-cao/",
        method: "POST",
        body: formData,
      }),
    }),
    submitAdMethod: builder.mutation<any, AdsGeoJson.AdMethodCreateProperty>({
      query: (formData) => ({
        url: "api/hinh-thuc-quang-cao/",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    submitUpdateAdMethod: builder.mutation<any, AdsGeoJson.AdMethodProperty>({
      query: (body) => ({
        url: `api/hinh-thuc-quang-cao/${body.id_htqc}`,
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteAdMethod: builder.mutation<any, AdsGeoJson.AdMethodDeleteProperty>({
      query: (data) => ({
        url: `api/hinh-thuc-quang-cao/${data.id_htqc}`,
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
        url: `api/cap-phep-quang-cao/${body.id_yeu_cau}`,
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
        url: `api/yeu-cau-quang-cao/chinh-sua/${body.id_yeu_cau}`,
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
        url: "api/dia-diem/chinh-sua",
      }),
    }),
    submitPlaceChangeRequest: builder.mutation<
      any,
      PlaceChangeApi.PlaceChangeRequestCreate
    >({
      query: (body) => ({
        url: "api/dia-diem/chinh-sua",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getImageUrl: builder.query<
      ImageApi.GetImageQueryResponse,
      ImageApi.GetImageQuery
    >({
      query: ({ filename, bkname }) => ({
        url: `api/image/`,
        params: { filename, bkname },
      }),
    }),
    getAllWard: builder.query<WardItem[], GetAllWardArgs>({
      query: ({ id_quan }) => ({
        url: "api/public/phuong",
        params: { id_quan },
      }),
    }),
    loginAccount: builder.mutation<AuthApi.LoginResponse, AuthApi.LoginRequest>(
      {
        query: (body) => ({
          url: "auth/login",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      },
    ),
    registerAccount: builder.mutation<
      AuthApi.RegisterResponse,
      AuthApi.RegisterRequest
    >({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    sendVerificationCode: builder.mutation<
      AuthApi.SendVerificationCodeToEmailResponse,
      AuthApi.SendVerificationCodeToEmailRequest
    >({
      query: (body) => ({
        url: "auth/send-verification-code",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyEmail: builder.mutation<
      AuthApi.VerifyEmailResponse,
      AuthApi.VerifyEmailRequest
    >({
      query: (body) => ({
        url: "auth/verify-email",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    changePasswordWithToken: builder.mutation<
      AuthApi.ChangePasswordTokenResponse,
      AuthApi.ChangePasswordTokenRequest
    >({
      query: (body) => ({
        url: "auth/change-password-token",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // getAccountProfile: builder.query<any, any>({
    //   query: ({ authToken }) => ({
    //     url: "user/",
    //     params: { token: authToken },
    //     method: "GET",
    //   }),
    // }),
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

  useGetImageUrlQuery,
  useLazyGetImageUrlQuery,

  useLazyGetAllReportInfoQuery: useLazyGetAllReportInfo,
  useGetAllWardQuery: useGetAllWards,
  useLazyGetAllWardQuery: useLazyGetAllWards,

  useLoginAccountMutation,
  useRegisterAccountMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
  useChangePasswordWithTokenMutation,
  // useGetAccountProfileQuery,

  useUpdateReportStatusMutation,
} = apiSlice;
