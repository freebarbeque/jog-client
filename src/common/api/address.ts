import {get, patch, post} from '../api/request';
import {IAddress, IAddressFormValues} from '../interfaces/userDetails';
import {getUserWithAddress} from '../sagas/auth';
import {select} from 'redux-saga/effects';
import {getUser} from '../selectors/auth';

export function* createAddress(userId: string | number, postcode: IAddressFormValues, address: IAddress) {
    const user = yield select(getUser);
    const reqBody = {
        data: {
            type: 'users',
            attributes: {
                address_attributes: {
                    id: user.address.id,
                    line1: address.line_1,
                    line2: address.line_2,
                    city: address.post_town,
                    postcode: postcode
                }
            }
        }
    };

    const {body} = yield patch(`users/${userId}?include=address`, reqBody);
    return body;
}
