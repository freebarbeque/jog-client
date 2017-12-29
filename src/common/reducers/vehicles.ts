import {
    SET_LOADING_STATE,
    ADD_VEHICLE,
    SET_VEHICLES,
} from '../constants/vehicles';

const initialState = {
    vehicles: [],
    isLoading: false,
};

export default function(state: any = initialState, action: any) {
    switch (action.type) {
        case SET_LOADING_STATE:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case ADD_VEHICLE:
            return {
                ...state,
                vehicles: [...state.vehicles, action.vehicle]
            };

        case SET_VEHICLES:
            return {
                ...state,
                vehicles: action.vehicles,
            };

        default:
            return state;
    }
}