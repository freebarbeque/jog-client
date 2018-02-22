import {
    VEHICLE_FETCH_STARTED,
    VEHICLE_FETCH_FINISHED,
    VEHICLE_FETCH_FAILED,
    VEHICLE_ADD,
    VEHICLE_UPDATE,
    VEHICLE_REMOVE,
    VEHICLES_FETCH_STARTED,
    VEHICLES_FETCH_FINISHED,
    VEHICLES_FETCH_FAILED,
} from './constants';

import createFragment from '../../handlers/createFragment';

const VEHICLE = createFragment('vehicle');

const initialState = {
    isLoading: false,
    error: null,
    vehicles: null,
    collection: new Set(),
};

export default function createReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case VEHICLES_FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case VEHICLES_FETCH_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case VEHICLES_FETCH_FINISHED:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    ...payload.vehicles.reduce((fragment, vehicle) => {
                        fragment[vehicle.id] = VEHICLE.fetched(vehicle);
                        return fragment;
                    }, {})
                },
                collection: new Set([...Array.from(state.collection), ...payload.vehicles.map(p => p.id)]),
                isLoading: false,
            };

        case VEHICLE_ADD:
            return {
                ...state,
                collection: new Set([...Array.from(state.collection), payload.vehicle.id]),
                vehicles: {
                    ...state.vehicles,
                    [payload.vehicle.id]: VEHICLE.fetched(payload.vehicle)
                }
            };

        case VEHICLE_UPDATE:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    [payload.vehicle.id]: VEHICLE.fetched(payload.vehicle),
                }
            };

        case VEHICLE_REMOVE:
            delete state.vehicles[payload.vehicleId];
            state.collection.delete(payload.vehicleId);

            return { ...state };

        case VEHICLE_FETCH_STARTED:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    [payload.vehicleId]: VEHICLE.fetching(),
                }
            };

        case VEHICLE_FETCH_FAILED:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    [payload.vehicleId]: VEHICLE.failed(payload.error),
                }
            };

        case VEHICLE_FETCH_FINISHED:
            return {
                ...state,
                vehicles: {
                    ...state.vehicles,
                    [payload.vehicleId]: VEHICLE.fetched(payload.vehicle),
                },
                collection: new Set([...Array.from(state.collection), payload.vehicle.id]),
            };

        default:
            return state;
    }
}
