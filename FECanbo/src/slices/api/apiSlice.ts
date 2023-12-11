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
        getAllAdsRequest: builder.query({
            query: () => "/don-dang-ky-quang-cao"
        }),
        getAnAdsRequest: builder.query({
            query: (id) => `/don-dang-ky-quang-cao/${id}`
        }),
        getAllReportInfo: builder.query({
            query: () => "/bao-cao-nguoi-dan/"
        }),
        getAReportInfo: builder.query({
            query: (id) => `/bao-cao-nguoi-dan/${id}` 
        })
    })
});

export const { useGetAllAdsInfoQuery } = apiSlice;