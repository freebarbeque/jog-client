const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, setDriversList, removeDriverList, submitDriverSuccess} from '../../actions/userDetails';
import {createDriver, getDrivers, removeDriver, updateDriver} from '../../api/drivers';
import {getUser} from '../../selectors/auth';
import {CREATE_DRIVER, SUBMIT_DRIVER, UPDATE_DRIVER, REMOVE_DRIVER, UPDATE_DRIVER_FORM} from '../../constants/userDetails';
import {getFormValues} from 'redux-form';
import {stopSubmit, reset, destroy, initialize} from 'redux-form';
import { updateDriverOnPolicyQuoteRequest } from '../../actions/policyQuoteRequest';
import {setSteps} from '../../../web/actions/page';
import {format} from 'date-fns';

function* driverWorker(policyId: string) {
    while (true) {
        const {submit, update, remove} = yield race({
            submit: take(SUBMIT_DRIVER),
            update: take(UPDATE_DRIVER),
            remove: take(REMOVE_DRIVER),
        });
        const user = yield select(getUser);

        if (submit) {
            const { formName, submitDeferred } = submit;
            yield put(setIsLoading(true));

            try {
                const { motoring_conviction, motoring_conviction_visible, ...rest } = yield select(getFormValues(formName));
                const formValues = {
                    ...rest,
                    date_of_birth: rest.date_of_birth.format('YYYY-MM-DD'),
                    motoring_conviction_attributes: motoring_conviction && motoring_conviction_visible ? motoring_conviction[0] : null,
                };
                const { errors, driver } = yield createDriver(user.id, CREATE_DRIVER, formValues);

                if (errors) {
                    yield put(stopSubmit(formName, { ...errors }));
                    submitDeferred.reject({ validationErrors: errors });
                } else {
                    submitDeferred.resolve();
                    const {drivers} = yield getDrivers(user.id);
                    yield put(setDriversList(cookDrivers(drivers)));
                    // yield put(reset(formName));
                }
            } catch (err) {
                yield put(stopSubmit(formName, {_error: err.message}));
                continue;
            }
            yield put(setIsLoading(false));
        }
        if (update) {
            const { submitDeferred } = update;
            yield put(setIsLoading(true));
            try {
                const { motoring_conviction, motoring_conviction_visible, ...rest } = yield select(getFormValues(UPDATE_DRIVER_FORM(update.index)));
                const formValues = {
                    ...rest,
                    date_of_birth: rest.date_of_birth.format('YYYY-MM-DD'),
                    motoring_conviction_attributes: motoring_conviction && motoring_conviction_visible ? motoring_conviction[0] : null,
                };

                const { errors, driver } = yield updateDriver(user.id, UPDATE_DRIVER, formValues.id, formValues);

                if (errors) {
                    yield put(stopSubmit(UPDATE_DRIVER_FORM(update.index), { ...errors }));
                    submitDeferred.reject({ validationErrors: errors });
                } else {
                    submitDeferred.resolve();
                    const {drivers} = yield getDrivers(user.id);
                    yield put(setDriversList(cookDrivers(drivers)));
                }
            } catch (err) {
                yield put(stopSubmit(UPDATE_DRIVER_FORM(update.index), {_error: err.message}));
                continue;
            }
            yield put(setIsLoading(false));
        }
        if (remove) {
            yield put(setIsLoading(true));
            const { driverId } = remove;
            try {
                yield removeDriver(user.id, REMOVE_DRIVER, driverId);
                const { drivers } = yield getDrivers(user.id);
                yield put(setDriversList(cookDrivers(drivers)));
            } catch (err) {
                console.error(err);
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
        yield put(setDriversList(cookDrivers(drivers)));
    }
    yield put(setIsLoading(false));
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield put(removeDriverList());
    yield cancel(worker);
}

function cookDrivers(drivers: any) {
    return drivers.map(driver => {
        return {
            ...driver,
            motoring_conviction_visible: !!driver.motoring_conviction,
            motoring_conviction: driver.motoring_conviction ? [driver.motoring_conviction] : [{}],
        }
    });

}