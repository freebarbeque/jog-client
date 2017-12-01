import {IUserDetailsReduxState} from '../interfaces/userDetails';
import {IAction} from '../interfaces/action';
import {
    SET_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_ADDRESS,
    STORE_DRIVER_LOCALLY, STORE_VEHICLE_LOCALLY,
} from '../constants/userDetails';

const defaultState = {
    vehicles: {},
    drivers: {},
    address: null,
    isLoading: false,
    availableDrivers: [],
    availableVehicles: [],
}

export default function (state: IUserDetailsReduxState = defaultState, action: IAction) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address,
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }

        // todo: remove when integrated with the API
        case SUBMIT_ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    submitted: true,
                }
            }

        // todo: remove when integrated with the API
        case STORE_DRIVER_LOCALLY:
            return {
                ...state,
                drivers: {
                    ...state.drivers,
                    [action.policyId]: action.driver.id,
                },
                availableDrivers: state.availableDrivers.find(d => d.id === action.driver.id) ? state.availableDrivers : state.availableDrivers.concat(action.driver)
            }

        // todo: remove when integrated with the API
        case STORE_VEHICLE_LOCALLY:
            return {
                ...state,
                vehicles: {
                    [action.policyId]: action.vehicle.id,
                },
                availableVehicles: state.availableVehicles.find(d => d.id === action.vehicle.id) ? state.availableVehicles : state.availableVehicles.concat(action.vehicle)
            }

        default:
            return state;
    }
}