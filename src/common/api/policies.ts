import {get, post} from '../api/request';
import {MOTOR_POLICY} from '../constants/policies';
import {IPolicy} from "~/common/interfaces/policies";

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

export function* getInsuranceCompanies() {
    const {body} = yield get('insurance_companies');
    return body;
}

export function* createPolicy(userId: string|number, type: string, policy: Partial<IPolicy>) {
    yield post(`users/$`)
}