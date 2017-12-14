import {IUserDetailsReduxState} from '../interfaces/userDetails';
import {IAction} from '../interfaces/action';
import {
    SET_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_ADDRESS,
    STORE_VEHICLE_LOCALLY,
    SET_DRIVER_LIST,
    REMOVE_DRIVER_LIST,
    SET_VEHICLE_DATA,
    LOOKUP_REGISTRATION_NUMBER,
    DELETE_REGISTRATION_NUMBER,
    DELETE_VEHICLE_DATA,
    LOOKUP_POSTCODE,
    DELETE_POSTCODE,
    SET_ADDRESS_SUBMIT_ERROR,
    SUBMIT_DRIVER_SUCCESS,
} from '../constants/userDetails';

const defaultState = {
    vehicles: {},
    drivers: {},
    address: null,
    isLoading: false,
    availableVehicles: [],
    vehicleData: null,
    registrationNumber: null,
    postCode: null,
    addressSubmitError: null,
    driversList: null,
    submitDriver: false,
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
        case STORE_VEHICLE_LOCALLY:
            return {
                ...state,
                vehicles: {
                    [action.policyId]: action.vehicle.id,
                },
                availableVehicles: state.availableVehicles.find(d => d.id === action.vehicle.id) ? state.availableVehicles : state.availableVehicles.concat(action.vehicle)
            }

        case SET_DRIVER_LIST:
            return {
                ...state,
                driversList: action.drivers,
            }

        case REMOVE_DRIVER_LIST:
            return {
                ...state,
                driversList: null,
            }

        case SUBMIT_DRIVER_SUCCESS:
            return {
                ...state,
                submitDriver: action.success,
            }

        default:
            return state;
    }
}