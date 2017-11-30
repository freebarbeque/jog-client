import {get, patch, post} from '../api/request';
import {IDriver} from '../interfaces/drivers';

export function* getDrivers(userId: number) {
    const {body} = yield get(`users/${userId}/drivers`);
    return body;
}