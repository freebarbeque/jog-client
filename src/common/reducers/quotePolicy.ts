import {
    SET_ADDRESS_TO_QUOTE,
    SET_DRIVER_TO_QUOTE,
    SET_VEHICLE_TO_QUOTE,
    REMOVE_DRIVER_FROM_QUOTE,
    SET_LOADING_STATE,
} from '../constants/quotePolicy';

const initialState = {
    quotes: {},
    isLoading: false,
};

export default function(state: any = initialState, action: any) {
    switch (action.type) {
        case SET_LOADING_STATE:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case REMOVE_DRIVER_FROM_QUOTE:
            return {
                ...state,
                quotes: {
                    [action.policyId]: {
                        ...state.quotes[action.policyId],
                        driver: null,
                    }
                }
            };

        case SET_VEHICLE_TO_QUOTE:
            return {
                ...state,
                quotes: {
                    ...state.quotes,
                    [action.policyId]: {
                        ...state.quotes[action.policyId],
                        vehicle: action.vehicle,
                    }
                },
            };

        case SET_DRIVER_TO_QUOTE:
            return {
                ...state,
                quotes: {
                    ...state.quotes,
                    [action.policyId]: {
                        ...state.quotes[action.policyId],
                        driver: action.driver,
                    }
                },
            };

        case SET_ADDRESS_TO_QUOTE:
            return {
                ...state,
                quotes: {
                    ...state.quotes,
                    [action.policyId]: {
                        ...state.quotes[action.policyId],
                        address: action.address,
                    }
                },
            };

        default:
            return state;
    }
}