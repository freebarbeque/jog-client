import {mapVehicleDetailsFormValues} from '../../utils/userDetails';
import {createVehicle} from '~/common/api/vehicle';
import {getUser} from 'src/common/selectors/auth';
import {stopSubmit} from 'redux-form';

const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, storeVehicleLocally} from '../../actions/userDetails';
import {SUBMIT_VEHICLE} from '../../constants/userDetails';
import {MOTOR_VEHICLE} from 'src/common/constants/userDetails';

function* vehicleWorker(policyId: string) {
    const {vehicle} = yield take(SUBMIT_VEHICLE);
    const user = yield select(getUser);
    yield put(setIsLoading(true));
    try {
        yield createVehicle(user.id, MOTOR_VEHICLE, mapVehicleDetailsFormValues(vehicle));
    } catch (err) {
        console.error(err);
        yield put(stopSubmit('carDetailsForm', {_error: err.message}));
        yield put(setIsLoading(false));
    }
    // yield put(storeVehicleLocally(policyId, mapVehicleDetailsFormValues(vehicle)));
    // yield put(push(`/app/user/motor/${policyId}/holder`))
    yield put(setIsLoading(false));
}

export function* vehicleFlow(policyId: string) {
    yield put(setSteps([]));
    const worker = yield fork(vehicleWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}