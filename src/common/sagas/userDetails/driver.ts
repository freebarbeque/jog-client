const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, setDriversList, removeDriverList, submitDriverSuccess} from '../../actions/userDetails';
import {createDriver, getDrivers, removeDriver, updateDriver} from '../../api/drivers';
import {getUser} from '../../selectors/auth';
import {CREATE_DRIVER, SUBMIT_DRIVER, UPDATE_DRIVER, REMOVE_DRIVER, UPDATE_DRIVER_FORM} from '../../constants/userDetails';
import {getFormValues} from 'redux-form';
import {stopSubmit, reset, destroy, initialize} from 'redux-form';
import { setDriverToPolicyQuote, removeDriverFromPolicyQuote } from '../../actions/quotePolicy';
import {setSteps} from '../../../web/actions/page';

function* driverWorker(policyId: string) {
    while (true) {
        const {submit, update, remove} = yield race({
            submit: take(SUBMIT_DRIVER),
            update: take(UPDATE_DRIVER),
            remove: take(REMOVE_DRIVER),
        });
        const user = yield select(getUser);

        if (submit) {
            const { formName } = submit;

            yield put(setIsLoading(true));

            try {
                const formValues = yield select(getFormValues(formName));
                const { errors, driver } = yield createDriver(user.id, CREATE_DRIVER, formValues);

                if (errors) {
                    yield put(stopSubmit(formName, { ...errors }));
                } else {
                    yield put(submitDriverSuccess(true));
                    const {drivers} = yield getDrivers(user.id);
                    yield put(setDriversList(drivers));
                    yield put(setDriverToPolicyQuote(policyId, driver));
                    yield put(reset(formName));
                }
            } catch (err) {
                yield put(stopSubmit(formName, {_error: err.message}));
                continue;
            }

            yield put(setIsLoading(false));
        }
        if (update) {
            yield put(setIsLoading(true));
            try {
                const values = yield select(getFormValues(UPDATE_DRIVER_FORM(update.index)));
                const { errors, driver } = yield updateDriver(user.id, UPDATE_DRIVER, values.id, values);

                if (errors) {
                    yield put(stopSubmit(UPDATE_DRIVER_FORM(update.index), { ...errors }));
                } else {
                    yield put(submitDriverSuccess(true));
                    const {drivers} = yield getDrivers(user.id);
                    yield put(setDriversList(drivers));
                    yield put(setDriverToPolicyQuote(policyId, driver));
                }
            } catch (err) {
                yield put(stopSubmit(UPDATE_DRIVER_FORM(update.index), {_error: err.message}));
                continue;
            }
            yield put(setIsLoading(false));
        }
        if (remove) {
            yield put(setIsLoading(true));
            try {
                const values = yield select(getFormValues(UPDATE_DRIVER_FORM(remove.index)));
                yield removeDriver(user.id, REMOVE_DRIVER, values.id);
                yield put(removeDriverFromPolicyQuote(policyId));
                const {drivers} = yield getDrivers(user.id);
                yield put(setDriversList(drivers));
            } catch (err) {
                console.log(err);
                continue;
            }
            yield put(setIsLoading(false));
        }
    }
}

export function* driverFlow(policyId: string) {
    yield put(setSteps([]));
    yield put(setIsLoading(true));
    const user = yield select(getUser);
    const {drivers} = yield getDrivers(user.id);
    if (drivers) {
        yield put(setDriversList(drivers));
    }
    yield put(setIsLoading(false));
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield put(removeDriverList());
    yield cancel(worker);
}