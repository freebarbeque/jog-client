import {get} from "../api/request";
import {MOTOR_POLICY} from "../constants/policies";

export function* getPolicies(type: string, userId: number) {
    switch (type) {
        case (MOTOR_POLICY): {
            const {body} = yield get(`users/${userId}/motor_policies`);
            return body;
        }

        default: {
            throw new Error('Unknown policy type');
        }
    }
}