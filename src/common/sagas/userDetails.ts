import {cancel, fork, put, race, select, take} from 'redux-saga/effects';
import {getCurrentStep} from '../../web/selectors/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {LOOKUP_POSTCODE, POSTCODE_FORM, SUBMIT_ADDRESS, CANCEL_SUBMIT_ADDRESS} from '../constants/userDetails';
import {lookupPostCode} from '../api/idealPostcodes';
import {stopSubmit} from 'redux-form';
import {setAddress} from '../actions/userDetails';
import {goToNextStep, goToPrevStep} from '../../web/actions/page';
import {isChangeStepAction} from '../../web/utils/page';

function* postcodeFlow() {
    while (true) {
        const {postCode} = yield take(LOOKUP_POSTCODE);
        try {
            const address = yield lookupPostCode(postCode);
            if (address.code === 2000) {
                yield put(setAddress(address.result[0]));
                yield put(goToNextStep());
            } else {
                const err: any = new Error('Ideal postcodes responded with an error');
                err.code = address.code;
                throw err;
            }
        } catch (err) {
            yield put(stopSubmit(POSTCODE_FORM, {_error: err.message}));
        }
    }
}

function* addressFlow() {
    while (true) {
        const {cancelSubmit, submit} = yield race({
            cancelSubmit: take(CANCEL_SUBMIT_ADDRESS),
            submit: take(SUBMIT_ADDRESS),
        })

        if (cancelSubmit) {
            yield put(goToPrevStep());
            return;
        } else if (submit) {
            console.log('Will submit address');
        }
    }
}

function* addressStepsWorker(policyId: number) {
    while (true) {
        const currentStep = yield select(getCurrentStep);
        const workers: any[] = [];

        switch (currentStep) {
            case 1: {
                const worker = yield fork(postcodeFlow);
                workers.push(worker);
                break;
            }
            case 2:{
                const worker = yield fork(addressFlow);
                workers.push(worker);
                break;
            }
            default:
                break;
        }

        yield take(isChangeStepAction)
        yield workers.map(w => cancel(w));
    }
}

export function* addressStepsFlow(policyId: number) {
    const worker = yield fork(addressStepsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield cancel(worker);
}