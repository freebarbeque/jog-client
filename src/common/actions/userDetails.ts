import {LOOKUP_POSTCODE} from '../constants/userDetails';

export function lookupPostCode(postCode: string) {
    return {
        type: LOOKUP_POSTCODE,
        postCode,
    }
}