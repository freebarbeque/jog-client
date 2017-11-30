import {cancel, fork, select, take} from 'redux-saga/effects';
import {getCurrentStep} from '../../web/selectors/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {LOOKUP_POSTCODE, POSTCODE_FORM} from '../constants/userDetails';
import {lookupPostCode} from '../api/idealPostcodes';
import {stopSubmit} from 'redux-form';

function* postcodeFlow() {
    while (true) {
        const {postCode} = yield take(LOOKUP_POSTCODE);
        try {
            const address = yield lookupPostCode(postCode);
            if (address.code === 2000) {

            } else {
                const err: any = new Error('Ideal postcodes responded with an error');
                err.code = address.code;
                throw err;
            }
        } catch (err) {
            yield stopSubmit(POSTCODE_FORM, {_error: err.message});
        }
    }
}

function* addressStepsWorker(policyId: number) {
    while (true) {
        const currentStep = yield select(getCurrentStep);

        switch (currentStep) {
            case 1:
                yield postcodeFlow();
                break;
            default:
                return;
        }
    }
}

export function* addressStepsFlow(policyId: number) {
    const worker = yield fork(addressStepsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield cancel(worker);
}