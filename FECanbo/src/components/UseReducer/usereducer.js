import { useReducer } from 'react';

const initState = {
    name: '',
    address: '',
    lng: 106.69379445290143,
    lat: 10.788266281491206,
    isModalOpen: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ON_CHANGE_NAME":
            return {
                ...state,
                name: action.payload
            }
        case "ON_CHANGE_ADDRESS":
            return {
                ...state,
                address: action.payload
            }
        case "SET_LNG":
            return {
                ...state,
                lng: action.payload
            }
        case "SET_LAT":
            return {
                ...state,
                lat: action.payload
            }
        case "SHOW_MODAL_CLOSE":
            return {
                ...state,
                isModalOpen: false
            }
        case "SHOW_MODAL_OPEN":
            return {
                ...state,
                isModalOpen: true
            }
        default:
            throw new Error('Invalid action');
    }
}

export default function usereducer() {
    return useReducer(reducer, initState);
}
