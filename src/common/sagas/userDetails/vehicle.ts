import {mapVehicleDetailsFormValues} from '../../utils/userDetails';
import {createVehicle} from '~/common/api/vehicle';
import {stopSubmit} from 'redux-form';

const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {clearStep, goToNextStep, setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setVehicleData, setIsLoading} from '../../actions/userDetails';
import {LOOKUP_REGISTRATION_NUMBER, SUBMIT_VEHICLE} from '../../constants/userDetails';
import {MOTOR_VEHICLE} from 'src/common/constants/userDetails';
import {getCurrentStep} from '~/web/selectors/page';
import {isChangeStepAction} from '~/web/utils/page';

function* registrationNumberFlow() {
    while (true) {
        const {registrationNumber} = yield take(LOOKUP_REGISTRATION_NUMBER);
        yield put(setIsLoading(true));
        try {
            const data = yield createVehicle(MOTOR_VEHICLE, {vrm: registrationNumber});
            console.log(data);
            yield put(setVehicleData(data));
            yield put(goToNextStep());
        } catch (err) {
            yield put(stopSubmit('carDetailsForm', {_error: err.message}));
            yield put(setIsLoading(false));
        }
    }
}

// function* vehicleWorker(policyId: string) {
//     const {vehicle} = yield take(SUBMIT_VEHICLE);
//     yield put(setIsLoading(true));
//     try {
//         yield createVehicle(MOTOR_VEHICLE, {vrm: vehicle.vrm});
//     } catch (err) {
//         console.error(err);
//         yield put(stopSubmit('carDetailsForm', {_error: err.message}));
//         yield put(setIsLoading(false));
//     }
//     yield put(push(`/app/user/motor/${policyId}/holder`))
//     yield put(setIsLoading(false));
// }

function* vehicleStepsWorker(policyId: number) {
    while (true) {
        const currentStep = yield select(getCurrentStep);
        const workers: any[] = [];
        switch (currentStep) {
            case 1: {
                const worker = yield fork(registrationNumberFlow);
                workers.push(worker);
                break;
            }
            // case 2: {
            //     const worker = yield fork(addressFlow, policyId);
            //     workers.push(worker);
            //     break;
            // }
            default:
                break;
        }

        yield take(isChangeStepAction);
        yield put(setIsLoading(false));
    }
}

export function* vehicleStepsFlow(policyId: string) {
    yield put(setSteps([1, 2]));
    const worker = yield fork(vehicleStepsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(clearStep());
    yield put(setIsLoading(false));
    yield cancel(worker);
}