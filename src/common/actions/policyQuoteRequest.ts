import {
    UPDATE_POLICY_QUOTE_REQUEST,
    SET_POLICY_QUOTE_REQUEST_LOADING_STATE,
    MAKE_POLICY_QUOTE_REQUEST,
} from '../constants/policyQuoteRequest';

export const makePolicyQuoteRequest = () => ({
    type: MAKE_POLICY_QUOTE_REQUEST,
});

export function setLoadingState(policyId: any, isLoading: boolean) {
    return {
        type: SET_POLICY_QUOTE_REQUEST_LOADING_STATE,
        policyId,
        isLoading,
    }
}

export function updateStartDateOnPolicyQuoteRequest(policyId: any, startDate: any) {
    return {
        type: UPDATE_POLICY_QUOTE_REQUEST,
        policyId,
        payload: {
            startDate,
        }
    }
}

export function updateVehicleOnPolicyQuoteRequest(policyId: any, vehicle: any) {
    return {
        type: UPDATE_POLICY_QUOTE_REQUEST,
        policyId,
        payload: {
            vehicle: vehicle,
        }
    }
}

export function updateDriverOnPolicyQuoteRequest(policyId: any, driver: any) {
    return {
        type: UPDATE_POLICY_QUOTE_REQUEST,
        policyId,
        payload: {
            driver,
        }
    }
}

export function updateAddressOnPolicyQuoteRequest(policyId: any, address: any) {
    return {
        type: UPDATE_POLICY_QUOTE_REQUEST,
        policyId,
        payload: {
            address,
        }
    }
}
