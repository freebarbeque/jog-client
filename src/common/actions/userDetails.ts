import {IAddress} from '../interfaces/userDetails';
import {IDriverDetailsFormValues, IStoredDriver} from '../interfaces/drivers';
import {IVehicle} from '../interfaces/vehicles';

import {
    LOOKUP_POSTCODE,
    SET_ADDRESS,
    SUBMIT_ADDRESS,
    CANCEL_SUBMIT_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_DRIVER,
    STORE_DRIVER_LOCALLY,
    CHANGE_SELECTED_DRIVER,
    SUBMIT_VEHICLE,
    STORE_VEHICLE_LOCALLY,
    LOOKUP_REGISTRATION_NUMBER,
    SET_VEHICLE_DATA,
    CANCEL_SUBMIT_VEHICLE,
    DELETE_REGISTRATION_NUMBER,
    DELETE_POSTCODE,
    SET_ADDRESS_SUBMIT_ERROR,
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

export function submitDriver(driver: IDriverDetailsFormValues) {
    return {
        type: SUBMIT_DRIVER,
        driver,
    }
}

export function storeDriverLocally(policyId: string, driver: IStoredDriver) {
    return {
        type: STORE_DRIVER_LOCALLY,
        policyId,
        driver,
    }
}

export function changeSelectedDriver(driverId: string) {
    return {
        type: CHANGE_SELECTED_DRIVER,
        driverId,
    }
}

export function submitVehicle(vehicle: IVehicle) {
    return {
        type: SUBMIT_VEHICLE,
        vehicle,
    }
}

export function storeVehicleLocally(policyId: string, vehicle: IVehicle) {
    return {
        type: STORE_VEHICLE_LOCALLY,
        policyId,
        vehicle,
    }
}