import {getVehicle} from '~/common/api/vehicle';
import {stopSubmit} from 'redux-form';
const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {clearStep, goToNextStep, goToPrevStep, setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setVehicleData, setIsLoading, deleteRegistrationNumber} from '../../actions/userDetails';
import {
    CANCEL_SUBMIT_VEHICLE, LOOKUP_REGISTRATION_NUMBER,
    SUBMIT_VEHICLE
} from '../../constants/userDetails';
import {MOTOR_VEHICLE} from 'src/common/constants/userDetails';
import {getCurrentStep} from '~/web/selectors/page';
import {isChangeStepAction} from '~/web/utils/page';
import {delay} from 'redux-saga';

function* registrationNumberFlow() {
    while (true) {
        const {registrationNumber} = yield take(LOOKUP_REGISTRATION_NUMBER);
        yield put(setIsLoading(true));
        try {
            const data = yield getVehicle(MOTOR_VEHICLE, {vrm: registrationNumber});
            yield put(setVehicleData(data));
            yield put(goToNextStep());
        } catch (err) {
            yield put(stopSubmit('carRegistrationForm', {_error: err.message}));
            yield put(setIsLoading(false));
        }
    }
}

function* vehicleDetailsFlow(policyId: string) {
    while (true) {
        const {cancelSubmit, submit} = yield race({
            cancelSubmit: take(CANCEL_SUBMIT_VEHICLE),
            submit: take(SUBMIT_VEHICLE),
        });

        if (cancelSubmit) {
            yield put(goToPrevStep());
            return;
        } else if (submit) {
            // todo: integrate with the API
            yield put(setIsLoading(true));
            yield delay(1000);
            yield put(setIsLoading(false));
            yield put(push(`/app/dashboard/motor/${policyId}/quote`))
        }
    }
}

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
            case 2: {
                const worker = yield fork(vehicleDetailsFlow, policyId);
                workers.push(worker);
                break;
            }
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
    yield put(deleteRegistrationNumber());
    yield put(setIsLoading(false));
    yield cancel(worker);
}