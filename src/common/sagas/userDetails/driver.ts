import {mapDriverDetailsFormValues} from "~/common/utils/userDetails";

const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, storeDriverLocally} from '../../actions/userDetails';
import {delay} from 'redux-saga';
import {SUBMIT_DRIVER} from '~/common/constants/userDetails';

function* driverWorker(policyId: string) {
    const {driver} = yield take(SUBMIT_DRIVER);
    yield put(setIsLoading(true));
    yield delay(1000);
    yield put(storeDriverLocally(policyId, mapDriverDetailsFormValues(driver)));
    yield put(push(`/app/user/motor/${policyId}/holder`));
    yield put(setIsLoading(false));
}

export function* driverFlow(policyId: string) {
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}