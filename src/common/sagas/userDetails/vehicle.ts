const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading} from '../../actions/userDetails';

function* vehicleWorker(policyId: string) {
    yield console.log(policyId);
}

export function* vehicleFlow(policyId: string) {
    yield put(setSteps([]));
    const worker = yield fork(vehicleWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}