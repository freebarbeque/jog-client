const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, storeDriverLocally} from '../../actions/userDetails';
import {CHANGE_SELECTED_DRIVER, DRIVER_DETAILS_FORM, SUBMIT_DRIVER} from '../../constants/userDetails';
import {mapDriverDetailsFormValues, mapDriverToFormValues} from '../../utils/userDetails';
import {initialize} from 'redux-form';
import {IAction} from '../../interfaces/action';
import {getAvailableDriver} from '../../selectors/userDetils';

function* watchSelectedDriverChange({driverId}: IAction) {
    const driver = yield select(getAvailableDriver(driverId));
    yield put(initialize(DRIVER_DETAILS_FORM, mapDriverToFormValues(driver, driverId)));
}

function* driverWorker(policyId: string) {
    yield fork(takeEvery, CHANGE_SELECTED_DRIVER, watchSelectedDriverChange);

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