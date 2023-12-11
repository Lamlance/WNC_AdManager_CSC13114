import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const GoongPredict = z.object({
  description: z.string(),
  place_id: z.string(),
});
type GoongPredictType = z.infer<typeof GoongPredict>;
type GoongPredictRespond = {
  predictions: GoongPredictType[];
};
type GoongPlaceIdRespond = {
  result: {
    place_id: string;
    formatted_address: string;
    name: string;
    geometry: { location: { lat: number; lng: number } };
  };
};
type GoongKey = { key: string };

type GoongQueryPredict = GoongKey & { input: string };
type GoongPlaceQuery = GoongKey & { place_id: string };
const GoongApi = createApi({
  reducerPath: "GoongApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rsapi.goong.io/" }),
  endpoints: (builder) => ({
    getPredicts: builder.query<GoongPredictRespond, GoongQueryPredict>({
      query: ({ key, input }) => ({
        url: "/Place/AutoComplete",
        params: {
          api_key: key,
          input,
          location: "10.762898516037316, 106.68250571118257",
        },
      }),
    }),
    getPlaceDetail: builder.query<GoongPlaceIdRespond, GoongPlaceQuery>({
      query: ({ key, place_id }) => ({
        url: "Place/Detail",
        params: { api_key: key, place_id },
      }),
    }),
  }),
});

export const {
  useLazyGetPredictsQuery: useLazyGetPredicts,
  useGetPredictsQuery: useGetPredicts,
  useLazyGetPlaceDetailQuery: useLazyGetPlaceDetail,
  useGetPlaceDetailQuery: useGetPlaceDetail,
} = GoongApi;

export default GoongApi;
