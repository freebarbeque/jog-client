import {take, put, select} from 'redux-saga/effects';
import {initialize, getFormValues} from 'redux-form';

import {getExternalVehicleInformation} from 'src/common/api/vehicle';

import {
    refreshQuoteVrmRequest,
    refreshRegistrationStarted,
    refreshRegistrationFinished,
    refreshRegistrationFailed,
} from 'src/common/actions/quote/vehicle';

export default function* registrationNumberWorker(formName: string) {
    while (true) {
        try {
            const { registrationNumber } = yield take(refreshQuoteVrmRequest);
            const formData = yield select(getFormValues(formName));

            yield put(refreshRegistrationStarted());

            if (registrationNumber) {
                const vehicleData = yield getExternalVehicleInformation(registrationNumber);

                yield put(initialize(formName, {
                    registration: registrationNumber,
                    ...formData,
                    ...vehicleData,
                }));
            }

            yield put(refreshRegistrationFinished());
        } catch (error) {
            yield put(refreshRegistrationFailed(error));
        }
    }
}