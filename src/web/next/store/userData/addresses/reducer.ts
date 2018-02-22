import {
    ADDRESS_FETCH_STARTED,
    ADDRESS_FETCH_FINISHED,
    ADDRESS_FETCH_FAILED,
    ADDRESS_ADD,
    ADDRESS_UPDATE,
    ADDRESS_REMOVE,
    ADDRESSES_FETCH_STARTED,
    ADDRESSES_FETCH_FINISHED,
    ADDRESSES_FETCH_FAILED,
} from './constants';

import createFragment from '../../handlers/createFragment';

const ADDRESS = createFragment('address');

const initialState = {
    isLoading: false,
    error: null,
    addresses: null,
    collection: new Set(),
};

export default function createReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case ADDRESSES_FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case ADDRESSES_FETCH_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case ADDRESSES_FETCH_FINISHED:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    ...payload.addresses.reduce((fragment, address) => {
                        fragment[address.id] = ADDRESS.fetched(address);
                        return fragment;
                    }, {})
                },
                collection: new Set([...Array.from(state.collection), ...payload.addresses.map(p => p.id)]),
                isLoading: false,
            };

        case ADDRESS_ADD:
            return {
                ...state,
                collection: new Set([...Array.from(state.collection), payload.address.id]),
                addresses: {
                    ...state.addresses,
                    [payload.address.id]: ADDRESS.fetched(payload.address)
                }
            };

        case ADDRESS_UPDATE:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    [payload.address.id]: ADDRESS.fetched(payload.address),
                }
            };

        case ADDRESS_REMOVE:
            delete state.addresses[payload.addressId];
            state.collection.delete(payload.addressId);

            return { ...state };

        case ADDRESS_FETCH_STARTED:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    [payload.addressId]: ADDRESS.fetching(),
                }
            };

        case ADDRESS_FETCH_FAILED:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    [payload.addressId]: ADDRESS.failed(payload.error),
                }
            };

        case ADDRESS_FETCH_FINISHED:
            return {
                ...state,
                addresses: {
                    ...state.addresses,
                    [payload.addressId]: ADDRESS.fetched(payload.address),
                },
                collection: new Set([...Array.from(state.collection), payload.address.id]),
            };

        default:
            return state;
    }
}
