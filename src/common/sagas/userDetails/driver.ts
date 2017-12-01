const {cancel, fork, put, race, select, take} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, storeDriverLocally} from '../../actions/userDetails';
import {SUBMIT_DRIVER} from '../../constants/userDetails';
import {mapDriverDetailsFormValues} from '../../utils/userDetails';

function* driverWorker(policyId: string) {
    while (true) {
        const {driver} = yield take(SUBMIT_DRIVER);
        yield put(storeDriverLocally(policyId, mapDriverDetailsFormValues(driver)));
    }
}

export function* driverFlow(policyId: string) {
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}