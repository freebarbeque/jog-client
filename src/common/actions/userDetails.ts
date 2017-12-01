import {IAddress} from '../interfaces/userDetails';
import {IDriverDetailsFormValues} from '../interfaces/drivers';

import {
    LOOKUP_POSTCODE,
    SET_ADDRESS,
    SUBMIT_ADDRESS,
    CANCEL_SUBMIT_ADDRESS,
    SET_IS_LOADING,
    SUBMIT_DRIVER,
} from '../constants/userDetails';

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