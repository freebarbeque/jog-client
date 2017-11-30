import {select} from 'redux-saga/effects';
import {getCurrentStep} from '~/web/selectors/page';
/*
function* postcodeFlow() {

}
*/
export function* addressStepsFlow(policyId: number) {
    const currentStep = yield select(getCurrentStep);
    console.log(currentStep);
}