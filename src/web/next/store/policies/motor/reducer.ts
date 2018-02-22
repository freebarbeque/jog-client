import {
    POLICIES_FETCH_STARTED,
    POLICIES_FETCH_FINISHED,
    POLICIES_FETCH_FAILED,
} from './constants';

const initialState = {
    isLoading: false,
    error: null,
    policies: new Set(),
};

export default function createMotorPoliciesReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case POLICIES_FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case POLICIES_FETCH_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case POLICIES_FETCH_FINISHED:
            return {
                ...state,
                policies: new Set([...Array.from(state.policies), ...payload.motor_policies]),
                isLoading: false,
            };

        default:
            return state;
    }
}
