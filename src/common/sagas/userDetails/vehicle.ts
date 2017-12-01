const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading} from '../../actions/userDetails';
import {SUBMIT_VEHICLE} from '../../constants/userDetails';
import {delay} from 'redux-saga';

function* vehicleWorker(policyId: string) {
    const {vehicle} = yield take(SUBMIT_VEHICLE);
    yield put(setIsLoading(true));
    yield delay(1000);
    console.log(vehicle);
    //yield put(storeDriverLocally(policyId, mapDriverDetailsFormValues(driver)));
    //yield put(push(`/app/user/motor/${policyId}/address`))
    yield put(setIsLoading(false));
}

export function* vehicleFlow(policyId: string) {
    yield put(setSteps([]));
    const worker = yield fork(vehicleWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}