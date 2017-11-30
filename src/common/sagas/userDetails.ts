import {cancel, fork, select, take} from 'redux-saga/effects';
import {getCurrentStep} from '../../web/selectors/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {LOOKUP_POSTCODE} from '../constants/userDetails';

function* postcodeFlow() {
    while (true) {
        const {postCode} = yield take(LOOKUP_POSTCODE);
        console.log(process.env.IDEAL_POST_CODES_API_KEY);
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