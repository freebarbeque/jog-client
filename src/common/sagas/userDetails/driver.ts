const {cancel, fork, put, race, select, take} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading} from '../../actions/userDetails';

function* driverWorker(policyId: string) {
    console.log('driverWorker');
}

export function* driverFlow(policyId: string) {
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}