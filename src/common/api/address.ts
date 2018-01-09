import {patch} from '../api/request';
import {IAddress} from '../interfaces/userDetails';
import {CREATE_ADDRESS} from '../../common/constants/userDetails';

export function* createAddress(userId: string | number, type: string, address: Partial<IAddress>) {
    let addressType;
    switch (type) {
        case CREATE_ADDRESS: {
            addressType = 'users';
            break;
        }
        default: {
            throw new Error('Unknown address type');
        }
    }

    const reqBody = {
        data: {
            type: addressType,
            attributes: {
                addresses_attributes: address
            },
        }
    };
    const {body} = yield patch(`users/${userId}?includes=addresses`, reqBody);
    return body;
}
