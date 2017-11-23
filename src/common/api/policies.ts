import {get, post} from '../api/request';
import {MOTOR_POLICY} from '../constants/policies';
import {IPolicy} from "~/common/interfaces/policies";
import {getCreatePolicyQueryString} from "~/common/utils/policies";
import {getQueryString} from "~/common/utils/request";
import {select} from "redux-saga/effects";
import {getSessionToken} from "~/common/selectors/auth";

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

export function* createPolicy(userId: string | number, type: string, policy: Partial<IPolicy>) {
    let policyType;
    switch (type) {
        case MOTOR_POLICY: {
            policyType = 'motor_policies';
            break;
        }
        default: {
            throw new Error('Unknown policy type');
        }
    }
    const sessionToken = yield select(getSessionToken);
    const headers = new Headers({
        'Content-type': 'application/vnd.api+json',
        'Authorization': sessionToken,
        'Accept': 'application/vnd.api+json',
    });

    const {level_of_cover, ...rest} = policy;

    const body = {
        data: {
            type: policyType,
            attributes: rest,
        }
    };
    console.log(JSON.stringify(body));
    yield fetch(
        `${process.env.BASE_API}users/${userId}/${policyType}`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }
    )
}