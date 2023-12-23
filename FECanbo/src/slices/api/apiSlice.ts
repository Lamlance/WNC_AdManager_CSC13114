import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4030/api" }),
  endpoints: (builder) => ({
    getAllAdsInfo: builder.query<any, void>({
      query: () => "/quang-cao",
    }),
    getAnAdsInfo: builder.query({
      query: (id) => `/quang-cao/${id}`,
    }),
    getAllAdsRequest: builder.query<any, void>({
      query: () => "/yeu-cau-cap-phep",
    }),
    getAnAdsRequest: builder.query({
      query: (id) => `/yeu-cau-cap-phep/${id}`,
    }),
    getAllReportInfo: builder.query<any, void>({
      query: () => "/bao-cao",
    }),
    getAReportInfo: builder.query({
      query: (id) => `/bao-cao/${id}`,
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
} = apiSlice;
export const { reducer } = apiSlice;
