import {
    DRIVER_FETCH_STARTED,
    DRIVER_FETCH_FINISHED,
    DRIVER_FETCH_FAILED,
    DRIVER_ADD,
    DRIVER_UPDATE,
    DRIVER_REMOVE,
    DRIVERS_FETCH_STARTED,
    DRIVERS_FETCH_FINISHED,
    DRIVERS_FETCH_FAILED,
} from './constants';

import createFragment from '../../handlers/createFragment';

const DRIVER = createFragment('driver');

const initialState = {
    isLoading: false,
    error: null,
    drivers: null,
    collection: new Set(),
};

export default function createReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case DRIVERS_FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case DRIVERS_FETCH_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case DRIVERS_FETCH_FINISHED:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    ...payload.drivers.reduce((fragment, driver) => {
                        fragment[driver.id] = DRIVER.fetched(driver);
                        return fragment;
                    }, {})
                },
                collection: new Set([...Array.from(state.collection), ...payload.drivers.map(p => p.id)]),
                isLoading: false,
            };

        case DRIVER_ADD:
            return {
                ...state,
                collection: new Set([...Array.from(state.collection), payload.driver.id]),
                drivers: {
                    ...state.drivers,
                    [payload.driver.id]: DRIVER.fetched(payload.driver)
                }
            };

        case DRIVER_UPDATE:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    [payload.driver.id]: DRIVER.fetched(payload.driver),
                }
            };

        case DRIVER_REMOVE:
            delete state.drivers[payload.driverId];
            state.collection.delete(payload.driverId);

            return { ...state };

        case DRIVER_FETCH_STARTED:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    [payload.driverId]: DRIVER.fetching(),
                }
            };

        case DRIVER_FETCH_FAILED:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    [payload.driverId]: DRIVER.failed(payload.error),
                }
            };

        case DRIVER_FETCH_FINISHED:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    [payload.driverId]: DRIVER.fetched(payload.driver),
                },
                collection: new Set([...Array.from(state.collection), payload.driver.id]),
            };

        default:
            return state;
    }
}
