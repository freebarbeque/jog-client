import {
    LOOKUP_POSTCODE,
    SET_ADDRESS,
} from '../constants/userDetails';

export function lookupPostCode(postCode: string) {
    return {
        type: LOOKUP_POSTCODE,
        postCode,
    }
}

export function setAddress(address: any) {
    return {
        type: SET_ADDRESS,
        address,
    }
}