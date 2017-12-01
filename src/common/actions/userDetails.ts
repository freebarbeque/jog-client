import {IAddress} from '../interfaces/userDetails';
import {IDriverDetailsFormValues, IStoredDriver} from '../interfaces/drivers';

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
} from '../constants/userDetails';
import {IVehicle} from "~/common/reducers/vehicles";

export function lookupPostCode(postCode: string) {
    return {
        type: LOOKUP_POSTCODE,
        postCode,
    }
}

export function setAddress(address: IAddress) {
    return {
        type: SET_ADDRESS,
        address,
    }
}

export function submitAddress(address: IAddress) {
    return {
        type: SUBMIT_ADDRESS,
        address,
    }
}

export function cancelSubmitAddress() {
    return {
        type: CANCEL_SUBMIT_ADDRESS,
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
        vehicle,
    }
}