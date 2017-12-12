const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, setDriversList, removeDriverList} from '../../actions/userDetails';
import {createDriver, getDrivers, updateDriver} from '../../api/drivers';
import {getUser} from '../../selectors/auth';
import {CREATE_DRIVER, SUBMIT_DRIVER, UPDATE_DRIVER} from '../../constants/userDetails';
import {getFormValues} from 'redux-form';
import {stopSubmit, reset} from 'redux-form';
import {setSteps} from '../../../web/actions/page';

function* driverWorker() {
    while (true) {
        const {submit, update} = yield race({
            submit: take(SUBMIT_DRIVER),
            update: take(UPDATE_DRIVER)
        });
        const user = yield select(getUser);

        if (submit) {
            yield put(setIsLoading(true));
            try {
                const values = yield select(getFormValues('driverAdd'));
                yield createDriver(user.id, CREATE_DRIVER, values);
                const {drivers} = yield getDrivers(user.id);
                yield put(setDriversList(drivers));
                yield put(reset('driverAdd'));
            } catch (err) {
                yield put(stopSubmit('driverAdd', {_error: err.message}));
                continue;
            }
            yield put(setIsLoading(false));
        } else if (update) {
            yield put(setIsLoading(true));
            try {
                console.log(update);
                const values = yield select(getFormValues('driver' + update.index));
                yield updateDriver(user.id, UPDATE_DRIVER, values.id, values);
                const {drivers} = yield getDrivers(user.id);
                yield put(setDriversList(drivers));
            } catch (err) {
                yield put(stopSubmit('driver' + update.index, {_error: err.message}));
                continue;
            }
            yield put(setIsLoading(false));
        }
    }
}

export function* driverFlow() {
    yield put(setSteps([]));
    yield put(setIsLoading(true));
    const user = yield select(getUser);
    const {drivers} = yield getDrivers(user.id);
    if (drivers) {
        yield put(setDriversList(drivers));
    }
    yield put(setIsLoading(false));
    const worker = yield fork(driverWorker);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield put(removeDriverList());
    yield cancel(worker);
}