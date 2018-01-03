import {put, select, take, all, call} from 'redux-saga/effects';
import {delay} from 'redux-saga'

import {makePolicyQuoteRequest} from '../api/policyQuoteRequest';
import {getUser} from '../selectors/auth';

import { MAKE_POLICY_QUOTE_REQUEST, QUOTE_REQUESTS_TYPE_MOTOR_POLICY } from '../constants/policyQuoteRequest';

import { setLoadingState } from '../actions/policyQuoteRequest';
import { getPolicyQuoteRequest } from '../selectors/policyQuoteRequest';

function* createQuotePolicy(policyId: string) {
    const user = yield select(getUser);
    const policyQuoteRequest = yield select(getPolicyQuoteRequest, policyId);

    yield makePolicyQuoteRequest({
        user,
        policyQuoteRequest,
        quoteType: QUOTE_REQUESTS_TYPE_MOTOR_POLICY,
        motorPolicyId: policyId,
    });
}

export function* policyQuoteRequestWorker(policyId: string) {
    yield put(setLoadingState(policyId, false));

    while (true) {
        try {
            yield take(MAKE_POLICY_QUOTE_REQUEST);
            yield put(setLoadingState(policyId, true));

            yield all([
                call(createQuotePolicy, policyId),
                call(delay, 2500)
            ]);
        } catch (error) {
            console.log('Log => quotePolicyWorker error: ', error);
        } finally {
            yield put(setLoadingState(policyId, false));
        }
    }
}