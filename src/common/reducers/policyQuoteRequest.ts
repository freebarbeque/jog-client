import {
    UPDATE_POLICY_QUOTE_REQUEST,
    SET_POLICY_QUOTE_REQUEST_LOADING_STATE,
} from '../constants/policyQuoteRequest';

const initialState = {};

export default function(state: any = initialState, action: any) {
    switch (action.type) {
        case UPDATE_POLICY_QUOTE_REQUEST: {
            const updateItem = state[action.policyId];

            return {
                ...state,
                [action.policyId]: {
                    ...updateItem,
                    ...action.payload,
                }
            }
        }

        case SET_POLICY_QUOTE_REQUEST_LOADING_STATE: {
            const updateItem = state[action.policyId];

            return {
                ...state,
                [action.policyId]: {
                    ...updateItem,
                    isLoading: action.isLoading,
                }
            }
        }

        default:
            return state;
    }
}
