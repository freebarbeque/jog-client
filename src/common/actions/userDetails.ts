import {IAddress} from '../interfaces/userDetails';
import {IDriverDetailsFormValues} from '../interfaces/drivers';
import {IVehicle} from '../interfaces/vehicles';

import {
    LOOKUP_POSTCODE,
    SET_ADDRESS,
    SUBMIT_ADDRESS,
    CANCEL_SUBMIT_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_DRIVER,
    CHANGE_SELECTED_DRIVER,
    SUBMIT_VEHICLE,
    STORE_VEHICLE_LOCALLY,
    LOOKUP_REGISTRATION_NUMBER,
    SET_VEHICLE_DATA,
    CANCEL_SUBMIT_VEHICLE,
    DELETE_REGISTRATION_NUMBER,
    DELETE_POSTCODE,
    DELETE_VEHICLE_DATA,
    SET_ADDRESS_SUBMIT_ERROR,
    SET_DRIVER_LIST,
    REMOVE_DRIVER_LIST,
    UPDATE_DRIVER,
    REMOVE_DRIVER,
    SUBMIT_DRIVER_SUCCESS,
} from '../constants/userDetails';

export function lookupPostCode(postCode: string) {
    return {
        type: LOOKUP_POSTCODE,
        postCode,
    }
}

export function lookupRegistrationNumber(registrationNumber: string) {
    return {
        type: LOOKUP_REGISTRATION_NUMBER,
        registrationNumber,
    }
}

export function deletePostCode() {
    return {
        type: DELETE_POSTCODE,
    }
}

export function setAddress(address: IAddress) {
    return {
        type: SET_ADDRESS,
        address,
    }
}

export function setVehicleData(data: any) {
    return {
        type: SET_VEHICLE_DATA,
        data,
    }
}

export function deleteVehicleData() {
    return {
        type: DELETE_VEHICLE_DATA,
    }
}

export function submitAddress(address: IAddress) {
    return {
        type: SUBMIT_ADDRESS,
        address,
    }
}

export function setAddressSubmitError(addressSubmitError: string|null) {
    return {
        type: SET_ADDRESS_SUBMIT_ERROR,
        addressSubmitError
    }
}

export function cancelSubmitAddress() {
    return {
        type: CANCEL_SUBMIT_ADDRESS,
    }
}

export function cancelSubmitVehicle() {
    return {
        type: CANCEL_SUBMIT_VEHICLE,
    }
}

export function deleteRegistrationNumber() {
    return {
        type: DELETE_REGISTRATION_NUMBER,
    }
}

export function setIsLoading(isLoading: boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading,
    }
}

export function submitDriver(driver: IDriverDetailsFormValues, formName: string, submitDeferred: any) {
    return {
        type: SUBMIT_DRIVER,
        driver,
        formName,
        submitDeferred
    }
}

export function changeSelectedDriver(driverId: string) {
    return {
        type: CHANGE_SELECTED_DRIVER,
        driverId,
    }
}

export function submitVehicle(vehicle: IVehicle, submitDeferred: any) {
    return {
        type: SUBMIT_VEHICLE,
        vehicle,
        submitDeferred,
    }
}

export function storeVehicleLocally(policyId: string, vehicle: IVehicle) {
    return {
        type: STORE_VEHICLE_LOCALLY,
        policyId,
        vehicle,
    }
}

export function setDriversList(drivers: any) {
    return {
        type: SET_DRIVER_LIST,
        drivers,
    }
}

export function removeDriverList() {
    return {
        type: REMOVE_DRIVER_LIST
    }
}

export function updateDriver(index: string | number, submitDeferred: any) {
    return {
        type: UPDATE_DRIVER,
        index,
        submitDeferred
    }
}

export function removeDriver(driverId: number) {
    return {
        type: REMOVE_DRIVER,
        driverId
    }
}

export function submitDriverSuccess(success: boolean) {
    return {
        type: SUBMIT_DRIVER_SUCCESS,
        success
    }
}
