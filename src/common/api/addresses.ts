import {post, patch, get, remove} from '../api/request';
import {IAddress} from '../interfaces/userDetails';

export function* getAddresses(userId: string | number) {
    const {body} = yield get(`users/${userId}/addresses`);
    return body;
}

export function* removeAddress(userId: string | number, addressId: string | number) {
    yield remove(`users/${userId}/addresses/${addressId}`);
}

export function* createAddress(userId: string | number, address: Partial<IAddress>) {
    const reqBody = {
        data: {
            type: 'addresses',
            attributes: {
                ...address,
            },
        }
    };

    const {body} = yield post(`users/${userId}/addresses`, reqBody);

    return body;
}

export function* updateAddress(userId: string | number, addressId: number|string, address: Partial<IAddress>) {
    const reqBody = {
        data: {
            type: 'addresses',
            attributes: {
                ...address,
            },
        }
    };

    const {body} = yield patch(`users/${userId}/addresses/${addressId}`, reqBody);

    return body;
}
