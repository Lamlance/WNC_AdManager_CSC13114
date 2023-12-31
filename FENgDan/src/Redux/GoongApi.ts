import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";

const GoongPredict = z.object({
  description: z.string(),
  place_id: z.string(),
});
type GoongPredictType = z.infer<typeof GoongPredict>;
type GoongPredictRespond = { predictions: GoongPredictType[] };
type GoongPlaceIdRespond = {
  result: {
    place_id: string;
    formatted_address: string;
    name: string;
    geometry: { location: { lat: number; lng: number } };
  };
};
type GoongRevGeocodeRespond = {
  results: {
    address_components: { long_name: string; short_name: string }[];
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
    place_id: string;
  }[];
};

type GoongKey = { key: string };
type GoongQueryPredict = GoongKey & { input: string };
type GoongPlaceQuery = GoongKey & { place_id: string };
type GoongRevGeoQuery = GoongKey & { lat: number; lng: number };

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
          more_compound: true,
        },
      }),
    }),
    getPlaceDetail: builder.query<GoongPlaceIdRespond, GoongPlaceQuery>({
      query: ({ key, place_id }) => ({
        url: "Place/Detail",
        params: { api_key: key, place_id, more_compound: true },
      }),
    }),
    revGeocode: builder.query<GoongRevGeocodeRespond, GoongRevGeoQuery>({
      query: ({ key, lat, lng }) => ({
        url: "/Geocode",
        params: { api_key: key, latlng: `${lat},${lng}` },
      }),
    }),
  }),
});

export type { GoongPredictRespond, GoongRevGeocodeRespond };

export const {
  useLazyGetPredictsQuery: useLazyGetPredicts,
  useGetPredictsQuery: useGetPredicts,
  useLazyGetPlaceDetailQuery: useLazyGetPlaceDetail,
  useGetPlaceDetailQuery: useGetPlaceDetail,
  useLazyRevGeocodeQuery: useLazyRevGeocode,
  useRevGeocodeQuery: useRevGeocode,
} = GoongApi;

export default GoongApi;
