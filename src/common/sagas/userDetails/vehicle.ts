import {getVehicle, createVehicle} from '../../api/vehicle';
import {stopSubmit} from 'redux-form';
const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {clearStep, goToNextStep, goToPrevStep, setSteps} from '../../../web/actions/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setVehicleData, setIsLoading, deleteRegistrationNumber, deleteVehicleData, lookupRegistrationNumber} from '../../actions/userDetails';
import { addVehicle } from '../../actions/vehicles';
import { setVehicleToPolicyQuote } from '../../actions/quotePolicy';
import {
    CANCEL_SUBMIT_VEHICLE,
    LOOKUP_REGISTRATION_NUMBER,
    SUBMIT_VEHICLE,
    MOTOR_VEHICLE,
    CREATE_VEHICLE,
    VEHICLE_DETAILS_FORM,
} from '../../constants/userDetails';
import {getCurrentStep} from '../../../web/selectors/page';
import {isChangeStepAction} from '../../../web/utils/page';
import {IReduxState} from '../../interfaces/store';
import {getFormValues} from 'redux-form';
import {getUser} from '../../selectors/auth';
import {getRegistrationNumber} from '../../selectors/userDetils';
import {getPolicyQuote} from '../../selectors/policyQoute';

function* registrationNumberFlow() {
    while (true) {
        const regNum = yield select(getRegistrationNumber);
        const { registrationNumber } = yield take(LOOKUP_REGISTRATION_NUMBER);

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
        } finally {
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
            const formValues = yield select(getFormValues(VEHICLE_DETAILS_FORM));
            yield put(setVehicleData(formValues));
            yield put(goToPrevStep());
            return;
        } else if (submit) {
            try {
                yield put(setIsLoading(true));
                const formValues = yield select(getFormValues(VEHICLE_DETAILS_FORM));
                const regNum = yield select(getRegistrationNumber);

                const { errors, motor_vehicle: vehicle } = yield createVehicle(user.id, CREATE_VEHICLE, Object.assign({}, formValues, {registration: regNum}));

                if (errors) {
                    yield put(stopSubmit(VEHICLE_DETAILS_FORM, { ...errors }));
                } else {
                    // yield put(addVehicle(policyId, vehicle));
                    yield put(setVehicleToPolicyQuote(policyId, vehicle));
                    yield put(push(`/app/dashboard/motor/${policyId}/quote`))
                }
            } catch (err) {
                yield put(stopSubmit(VEHICLE_DETAILS_FORM, {_error: err.message}));
            } finally {
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

    const policyQuote = yield select(getPolicyQuote, policyId );
    const currentStep = yield select(getCurrentStep);

    if (policyQuote && policyQuote.vehicle) {
        yield put(lookupRegistrationNumber(policyQuote.vehicle.registration));
        yield put(setVehicleData(policyQuote.vehicle));

        if (currentStep === 1) {
            yield put(goToNextStep());
        }
    }

    const worker = yield fork(vehicleStepsWorker, policyId);

    yield take(LOCATION_CHANGE);
    yield put(clearStep());
    yield put(deleteRegistrationNumber());
    yield put(deleteVehicleData());
    yield put(setIsLoading(false));
    yield cancel(worker);
}