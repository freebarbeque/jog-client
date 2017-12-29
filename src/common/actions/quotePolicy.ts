import {
    SET_VEHICLE_TO_QUOTE,
    SET_DRIVER_TO_QUOTE,
    SET_ADDRESS_TO_QUOTE,
    SET_LOADING_STATE,
    MAKE_QUOTE_POLICY_REQUEST,
    REMOVE_DRIVER_FROM_QUOTE,
} from '../constants/quotePolicy';

export function setLoadingState(isLoading: boolean) {
    return {
        type: SET_LOADING_STATE,
        isLoading,
    }
}

export const removeDriverFromPolicyQuote = (policyId: any) => ({
    type: REMOVE_DRIVER_FROM_QUOTE,
    policyId,
});

export const setVehicleToPolicyQuote = (policyId: any, vehicle: any) => ({
    type: SET_VEHICLE_TO_QUOTE,
    policyId,
    vehicle,
});

export const setDriverToPolicyQuote = (policyId: any, driver: any) => ({
    type: SET_DRIVER_TO_QUOTE,
    policyId,
    driver,
});

export const setAddressToPolicyQuote = (policyId: any, address: any) => ({
    type: SET_ADDRESS_TO_QUOTE,
    policyId,
    address,
});

export const createQuotePolicyRequest = () => ({
    type: MAKE_QUOTE_POLICY_REQUEST,
});
