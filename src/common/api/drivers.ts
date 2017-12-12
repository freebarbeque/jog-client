import {get, post, patch} from '../api/request';
import {IDriver} from '../interfaces/drivers';
import {CREATE_DRIVER, UPDATE_DRIVER} from '../constants/userDetails';

export function* getDrivers(userId: number) {
    const {body} = yield get(`users/${userId}/drivers`);
    return body;
}

export function* createDriver(userId: string | number, type: string, policy: Partial<IDriver>) {
    let driversType;
    switch (type) {
        case CREATE_DRIVER: {
            driversType = 'drivers';
            break;
        }
        default: {
            throw new Error('Unknown driver type');
        }
    }

    const reqBody = {
        data: {
            type: driversType,
            attributes: policy,
        }
    };
    const {body} = yield post(`users/${userId}/${driversType}`, reqBody);
    return body;
}

export function* updateDriver(userId: string | number, type: string, driverId: string | number,  policy: Partial<IDriver>) {
    let driversType;
    switch (type) {
        case UPDATE_DRIVER: {
            driversType = 'drivers';
            break;
        }
        default: {
            throw new Error('Unknown driver type');
        }
    }

    const reqBody = {
        data: {
            type: driversType,
            attributes: policy,
        }
    };
    const {body} = yield patch(`users/${userId}/${driversType}/${driverId}`, reqBody);
    return body;
}