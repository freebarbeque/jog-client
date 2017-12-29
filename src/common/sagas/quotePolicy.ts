import {put, select, take, all, call} from 'redux-saga/effects';
import {delay} from 'redux-saga'

import {createQuotePolicyRequest} from '../api/quotePolicy';
import {getUser} from '../selectors/auth';
import { MAKE_QUOTE_POLICY_REQUEST, QUOTE_REQUESTS_TYPE_MOTOR_POLICY } from '../constants/quotePolicy';
import { setLoadingState } from '../actions/quotePolicy';
import {getPolicyQuote} from '../selectors/policyQoute';

function* createQuotePolicy(policyId: string) {
    const user = yield select(getUser);
    const policyQuote = yield select(getPolicyQuote, policyId);

    yield createQuotePolicyRequest({
        user,
        quoteType: QUOTE_REQUESTS_TYPE_MOTOR_POLICY,
        motorPolicyId: policyId,
        vehicle: policyQuote.vehicle,
        driver: policyQuote.driver,
        address: policyQuote.address,
    });
}

export function* quotePolicyWorker(policyId: string) {
    yield put(setLoadingState(false));

    while (true) {
        try {
            yield take(MAKE_QUOTE_POLICY_REQUEST);
            yield put(setLoadingState(true));

            yield all([
                call(createQuotePolicy, policyId),
                call(delay, 2500)
            ]);
        } catch (error) {
            console.log('Log => quotePolicyWorker error: ', error);
        } finally {
            yield put(setLoadingState(false));
        }
    }
}