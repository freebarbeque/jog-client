import {fork} from 'redux-saga/effects';

import initializeForm from './initializeForm';
import vehicleFormWorker from './vehicleFormWorker';
import registrationNumberWorker from './registrationNumberWorker';

export default function* quoteVehicleWorker(formName: string, policyId: number|string) {
    yield initializeForm(formName, policyId);

    yield fork(registrationNumberWorker, formName);
    yield fork(vehicleFormWorker, formName, policyId);
}