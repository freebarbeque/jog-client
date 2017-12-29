import { SET_VEHICLES, ADD_VEHICLE, SET_LOADING_STATE } from '../constants/vehicles';

export const setVehicles = (vehicles: any) => ({
    type: SET_VEHICLES,
    vehicles,
});

export const addVehicle = (policyId: any, vehicle: any) => ({
    type: ADD_VEHICLE,
    policyId,
    vehicle,
});

export const setLoading = (isLoading: boolean) => ({
    type: SET_LOADING_STATE,
    isLoading,
});