import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetAllAdsRequest,
  GetAllAdsReqRequest,
  GetAllAdsMethod,
} from "../../types/request";
import {
  AdBoardApi,
  AdChangeApi,
  AdsGeoJson,
  AdsReqApi,
  AuthApi,
  ImageApi,
  LandTypeApi,
  PlaceApi,
  PlaceChangeApi,
  ReportApi,
  ReportTypeApi,
  StatsApi,
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
      const authState = (getState() as RootState).auth;
      if (authState && authState.isLoggedIn) {
        headers.set("Authorization", `Bearer ${authState.authToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllAdsInfo: builder.query<
      AdsGeoJson.AdsGeoJsonProperty[],
      GetALLReportInfoArgs
    >({
      query: (args) => ({
        url: "api/quang-cao",
        params: { phuong_id: args.phuong_id },
      }),
    }),
    getAllAdsMethod: builder.query<
      AdsGeoJson.AdMethodProperty[],
      GetAllAdsMethod | void
    >({
      query: () => "api/hinh-thuc-quang-cao",
    }),

    getAllAdsReq: builder.query<
      AdsReqApi.ManyAdsRequestResponse[],
      GetALLReportInfoArgs
    >({
      query: (args) => ({
        url: "api/cap-phep-quang-cao",
        params: { phuong_id: args.phuong_id },
      }),
    }),
    getAllReportInfo: builder.query<
      ReportApi.ReportResponse[],
      GetALLReportInfoArgs
    >({
      query: (args) => ({
        url: "/api/bao-cao",
        params: { phuong_id: args.phuong_id },
      }),
    }),
    updateReportStatus: builder.mutation<
      ReportApi.ReportResponse["bao_cao"],
      ReportApi.ReportUpdate
    >({
      query: (body) => ({
        url: "/api/bao-cao",
        method: "PUT",
        body: body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAllAdChangeRequest: builder.query<
      AdChangeApi.AdChangeRequestResponse[],
      GetALLReportInfoArgs
    >({
      query: ({ phuong_id }) => ({
        url: "api/yeu-cau-quang-cao/chinh-sua",
        params: { phuong_id },
      }),
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
      GetALLReportInfoArgs
    >({
      query: ({ phuong_id }) => ({
        url: "api/dia-diem/chinh-sua",
        params: { phuong_id },
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
    updatePlaceChangeRequest: builder.mutation<
      any,
      PlaceChangeApi.PlaceChangeRequestResponse
    >({
      query: (body) => ({
        url: "api/dia-diem/chinh-sua",
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
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
    getAllAccount: builder.query<{ data: AuthApi.FullUserData[] }, void>({
      query: () => "/api/user/all",
    }),
    updateAccount: builder.mutation<
      void,
      { user_id: string; body: Partial<AuthApi.UserUpdateRequest> }
    >({
      query: ({ user_id, body }) => ({
        url: `/api/user/${user_id}`,
        method: "PUT",
        body: { ...body },
      }),
    }),

    getAdsGeoJson: builder.query<AdsGeoJson.AdsGeoJson, GetALLReportInfoArgs>({
      query: ({ phuong_id }) => ({ url: "/geojson", params: { phuong_id } }),
    }),
    getReportGeoJson: builder.query<
      AdsGeoJson.ReportGeoJson,
      GetALLReportInfoArgs
    >({
      query: ({ phuong_id }) => ({
        url: "/geojson/report",
        params: { phuong_id },
      }),
    }),

    getAllPublicWard: builder.query<{ phuong: WardItem["phuong"] }[], void>({
      query: () => ({ url: "api/public/phuong" }),
    }),
    createPublicWard: builder.mutation<
      void,
      Omit<WardItem["phuong"], "id_phuong">
    >({
      query: (body) => ({
        url: "api/public/phuong",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updatePublicWard: builder.mutation<
      void,
      Omit<WardItem["phuong"], "id_phuong">
    >({
      query: (body) => ({
        url: "api/public/phuong",
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAllPublicDistrict: builder.query<{ quan: WardItem["quan"] }[], void>({
      query: () => ({ url: "api/public/quan" }),
    }),
    createPublicDistrict: builder.mutation<
      void,
      Omit<WardItem["quan"], "id_quan">
    >({
      query: (body) => ({
        url: "api/public/quan",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updatePublicDistrict: builder.mutation<
      void,
      Omit<WardItem["quan"], "id_quan">
    >({
      query: (body) => ({
        url: "api/public/quan",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAllPlaceInfo: builder.query<
      { data: PlaceApi.GetAllPlaceResponse[] },
      void
    >({
      query: () => "/api/dia-diem",
    }),
    createPlaceInfo: builder.mutation<any, PlaceApi.CreatePlaceBody>({
      query: (body) => ({
        url: "/api/dia-diem",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updatePlaceInfo: builder.mutation<any, PlaceApi.UpdatePlaceBody>({
      query: (body) => ({
        url: "/api/dia-diem",
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAllReportType: builder.query<
      { data: ReportTypeApi.GetAllReportTypeResponse[] },
      void
    >({
      query: () => "/api/loai-bc",
    }),
    getAllBoardType: builder.query<
      { data: AdBoardApi.GetAllBoardTypeResponse[] },
      void
    >({
      query: () => "/api/bang-qc",
    }),
    getAllLandType: builder.query<
      { data: LandTypeApi.GetAllLandTypeResponse[] },
      void
    >({
      query: () => "/api/vi-tri",
    }),
    getReportStatsEachWard: builder.query<StatsApi.StatsResponse, void>({
      query: () => "/api/thong-ke",
    }),
  }),
});

export const {
  useGetAllAdsInfoQuery,
  useGetAllReportInfoQuery,
  useSubmitAdRequestMutation,
  useGetAllAdsReqQuery,
  useGetAllAdChangeRequestQuery,
  useLazyGetAllAdChangeRequestQuery,
  useSubmitAdChangeRequestMutation,
  useGetAllPlaceChangeRequestQuery,
  useLazyGetAllPlaceChangeRequestQuery,
  useSubmitPlaceChangeRequestMutation,
  useUpdatePlaceChangeRequestMutation,
  useGetAllAdsMethodQuery,
  useSubmitAdMethodMutation,
  useSubmitUpdateAdMethodMutation,
  useSubmitUpdateAdRequestStatusMutation,
  useSubmitUpdateAdChangeRequestStatusMutation,
  useDeleteAdMethodMutation,

  useGetImageUrlQuery,
  useLazyGetImageUrlQuery,

  useLazyGetAllReportInfoQuery: useLazyGetAllReportInfo,
  useLazyGetAllAdsInfoQuery: useLazyGetAllAdsInfo,
  useLazyGetAllAdsReqQuery: useLazyGetAllAdsReq,
  useGetAllWardQuery: useGetAllWards,
  useLazyGetAllWardQuery: useLazyGetAllWards,

  useLoginAccountMutation,
  useRegisterAccountMutation,
  useSendVerificationCodeMutation,
  useVerifyEmailMutation,
  useChangePasswordWithTokenMutation,
  // useGetAccountProfileQuery,

  useUpdateReportStatusMutation,
  useGetAllAccountQuery,
  useLazyGetAllAccountQuery,
  useUpdateAccountMutation,

  useGetAdsGeoJsonQuery,
  useLazyGetAdsGeoJsonQuery,
  useGetReportGeoJsonQuery,
  useLazyGetReportGeoJsonQuery,

  useLazyGetAllPublicDistrictQuery: useLazyGetAllPublicDistrict,
  useLazyGetAllPublicWardQuery: useLazyGetAllPublicWard,
  useCreatePublicDistrictMutation: useCreatePublicDistrict,
  useCreatePublicWardMutation: useCreatePublicWard,

  useGetAllPlaceInfoQuery,
  useLazyGetAllPlaceInfoQuery,
  useCreatePlaceInfoMutation,
  useUpdatePlaceInfoMutation,

  useGetAllReportTypeQuery,
  useLazyGetAllReportTypeQuery,
  useGetAllBoardTypeQuery,
  useLazyGetAllBoardTypeQuery,
  useGetAllLandTypeQuery,
  useLazyGetAllLandTypeQuery,

  useGetReportStatsEachWardQuery,
  useLazyGetReportStatsEachWardQuery,
} = apiSlice;
