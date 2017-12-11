import {getVehicle, createVehicle} from '../../api/vehicle';
import {stopSubmit} from 'redux-form';
const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {clearStep, goToNextStep, goToPrevStep, setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setVehicleData, setIsLoading, deleteRegistrationNumber, deleteVehicleData} from '../../actions/userDetails';
import {
    CANCEL_SUBMIT_VEHICLE,
    LOOKUP_REGISTRATION_NUMBER,
    SUBMIT_VEHICLE,
    MOTOR_VEHICLE,
    CREATE_VEHICLE,
} from '../../constants/userDetails';
import {getCurrentStep} from '../../../web/selectors/page';
import {isChangeStepAction} from '../../../web/utils/page';
import {IReduxState} from '../../interfaces/store';
import {getFormValues} from 'redux-form';
import {getUser} from '../../selectors/auth';
import {getRegistrationNumber} from '../../selectors/userDetils';

function* registrationNumberFlow() {
    while (true) {
        const regNum = select(getRegistrationNumber)
        const {registrationNumber} = yield take(LOOKUP_REGISTRATION_NUMBER);
        yield put(setIsLoading(true));
        try {
            if (regNum === null || regNum !== registrationNumber) {
                const data = yield getVehicle(MOTOR_VEHICLE, {vrm: registrationNumber});
                yield put(setVehicleData(data));
                yield put(goToNextStep());
            } else {
                yield put(goToNextStep());
            }
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
        const user = yield select(getUser);

        if (cancelSubmit) {
            const formValues = yield select(getFormValues('carDetailsForm'));
            yield put(setVehicleData(formValues));
            yield put(goToPrevStep());
            return;
        } else if (submit) {
            try {
                yield put(setIsLoading(true));
                const formValues = yield select(getFormValues('carDetailsForm'));
                const regNum = yield select(getRegistrationNumber);
                yield put(setVehicleData(formValues));
                yield createVehicle(user.id, CREATE_VEHICLE, Object.assign({}, formValues, {registration: regNum}));
                yield put(setIsLoading(false));
                yield put(push(`/app/dashboard/motor/${policyId}/quote`))
            } catch (err) {
                yield put(stopSubmit('carDetailsForm', {_error: err.message}));
                yield put(setIsLoading(false));
            }
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
        yield workers.map(w => cancel(w));
    }
}

export function* vehicleStepsFlow(policyId: string) {
    yield put(setSteps([1, 2]));
    const worker = yield fork(vehicleStepsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(clearStep());
    yield put(deleteRegistrationNumber());
    yield put(deleteVehicleData());
    yield put(setIsLoading(false));
    yield cancel(worker);
}