import {IUserDetailsReduxState} from '../interfaces/userDetails';
import {IAction} from '../interfaces/action';
import {
    SET_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_ADDRESS,
    STORE_DRIVER_LOCALLY,
    STORE_VEHICLE_LOCALLY,
    SET_VEHICLE_DATA,
    LOOKUP_REGISTRATION_NUMBER,
    DELETE_REGISTRATION_NUMBER,
    DELETE_VEHICLE_DATA,
    LOOKUP_POSTCODE,
    DELETE_POSTCODE,
    SET_ADDRESS_SUBMIT_ERROR,
} from '../constants/userDetails';

const defaultState = {
    vehicles: {},
    drivers: {},
    address: null,
    isLoading: false,
    availableDrivers: [],
    availableVehicles: [],
    vehicleData: null,
    registrationNumber: null,
    postCode: null,
    addressSubmitError: null,
}

export default function (state: IUserDetailsReduxState = defaultState, action: IAction) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address,
            }

        case DELETE_REGISTRATION_NUMBER:
            return {
                ...state,
                registrationNumber: null,
            }

        case SET_VEHICLE_DATA:
            return {
                ...state,
                vehicleData: action.data,
            }

        case LOOKUP_POSTCODE:
            return {
                ...state,
                postCode: action.postCode,
            }

        case DELETE_POSTCODE:
            return {
                ...state,
                postCode: null,
            }

        case DELETE_VEHICLE_DATA:
            return {
                ...state,
                vehicleData: null,
            }

        case LOOKUP_REGISTRATION_NUMBER:
            return {
                ...state,
                registrationNumber: action.registrationNumber,
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }
        case SET_ADDRESS_SUBMIT_ERROR:
            return {
                ...state,
                addressSubmitError: action.addressSubmitError
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