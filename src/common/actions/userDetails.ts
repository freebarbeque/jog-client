import {IAddress} from '../interfaces/userDetails';

import {
    LOOKUP_POSTCODE,
    SET_ADDRESS,
    SUBMIT_ADDRESS,
    CANCEL_SUBMIT_ADDRESS,
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