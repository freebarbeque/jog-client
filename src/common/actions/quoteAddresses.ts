import {
    SET_LOADING_STATE,
    LOOKUP_POSTCODE,
    ADD_ADDRESS,
    UPDATE_ADDRESS,
    REMOVE_ADDRESS,
    SET_ADDRESSES,
    SET_POSSIBLE_ADDRESSES,
    ADD_ADDRESS_REQUEST,
    UPDATE_ADDRESS_REQUEST,
    REMOVE_ADDRESS_REQUEST,
    SELECT_ADDRESS_REQUEST,
} from '../constants/quoteAddress';

export function setPossibleAddresses(possibleAddresses: any[]) {
    return {
        type: SET_POSSIBLE_ADDRESSES,
        possibleAddresses,
    }
}

export function selectAddressRequest(address: any) {
    return {
        type: SELECT_ADDRESS_REQUEST,
        address,
    }
}

export function addAddressRequest(address: any) {
    return {
        type: ADD_ADDRESS_REQUEST,
        address,
    }
}

export function updateAddressRequest(addressId: number|string, address: any) {
    return {
        type: UPDATE_ADDRESS_REQUEST,
        id: addressId,
        address,
    }
}

export function removeAddressRequest(addressId: any) {
    return {
        type: REMOVE_ADDRESS_REQUEST,
        id: addressId,
    }
}

export function setAddresses(addresses: any[]) {
    return {
        type: SET_ADDRESSES,
        addresses,
    }
}

export function removeAddress(addressId: string|number) {
    return {
        type: REMOVE_ADDRESS,
        id: addressId,
    }
}

export function addAddress(address: any) {
    return {
        type: ADD_ADDRESS,
        address,
    }
}

export function updateAddress(addressId: string|number, address: any) {
    return {
        type: UPDATE_ADDRESS,
        address,
        id: addressId,
    }
}

export function lookupPostCode(postCode: string) {
    return {
        type: LOOKUP_POSTCODE,
        postCode,
    }
}

export function setLoadingState(isLoading: boolean) {
    return {
        type: SET_LOADING_STATE,
        isLoading,
    }
}