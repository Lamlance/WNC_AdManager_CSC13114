import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaceApi } from "@admanager/shared";

interface placeState {
    districtId: number;
    districtName: string;
    districtList: PlaceApi.DistrictProperty[];
    wardId: number;
    wardName: string;
    wardList: PlaceApi.WardProperty[];
    placeList: PlaceApi.PlaceProperty[];
    placeId: number;
    placeName: string;
    placeAddress: string;
    placeLng: number;
    placeLat: number;
}

const initialState: placeState = {
    districtId: -1,
    districtName: 'Chọn quận',
    districtList: [],

    wardId: -1,
    wardName: 'Chọn phường',
    wardList: [],

    placeList: [],
    placeId: -1,
    placeName: '',
    placeAddress: '',
    placeLng: -1,
    placeLat: -1,
};

const placeSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setDistrict: (state, action) => {
            state.districtId = action.payload;
        },
        setDistrictName: (state, action) => {
            state.districtName = action.payload;
        },
        loadDistrict: (state, action) => {
            state.districtList = action.payload;
        },
        setWard: (state, action) => {
            state.wardId = action.payload;
        },
        setWardName: (state, action) => {
            state.wardName = action.payload;
        },
        loadWard: (state, action) => {
            state.wardList = action.payload;
        },
        setSelectedPlace: (state, action: PayloadAction<PlaceApi.PlaceProperty>) => {
            state.placeId = action.payload.id_dia_diem;
            state.placeName = action.payload.ten_dia_diem;
            state.placeAddress = action.payload.dia_chi;
            state.placeLng = action.payload.lng;
            state.placeLat = action.payload.lat;
        },
        loadPlace: (state, action) => {
            state.placeList = action.payload;
        },
        setLng: (state, action) => {
            state.placeLng = action.payload;
        },
        setLat: (state, action) => {
            state.placeLat = action.payload;
        },
        setCoordinates: (state, action) => {
            state.placeLng = action.payload.lng;
            state.placeLat = action.payload.lat;
        },
    },
});

export const { setDistrict, setDistrictName, loadDistrict, setWard, setWardName, loadWard, setSelectedPlace, loadPlace, setLng, setLat, setCoordinates } = placeSlice.actions;

export default placeSlice.reducer;
