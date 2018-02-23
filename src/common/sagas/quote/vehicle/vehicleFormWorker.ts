import {select, take, put, race} from 'redux-saga/effects';
import {getFormValues} from 'redux-form';
import {push} from 'react-router-redux';

import {createVehicle} from 'src/common/api/vehicle';

import {getUser} from 'src/common/selectors/auth';

import {SUBMIT_VEHICLE_REQUEST} from 'src/common/constants/quote/vehicle';
import {updateVehicleOnPolicyQuoteRequest} from 'src/common/actions/policyQuoteRequest';

export default function* vehicleFormWorker(formName: string, policyId: number|string) {
    while (true) {
        const currentUser = yield select(getUser);

        const {vehicle: vehicleData, submitDeferred} = yield take(SUBMIT_VEHICLE_REQUEST);

        const reqData = {
            ...vehicleData,
            ...(vehicleData.value_cents ? { value_cents: Number(vehicleData.value_cents) * 100 } : null), // should convert value from pounds to cents
        };

        const {errors, motor_vehicle: vehicle} = yield createVehicle(currentUser.id, reqData);

        if (errors) {
            submitDeferred.reject({validationErrors: errors});
        } else {
            submitDeferred.resolve();

            yield put(updateVehicleOnPolicyQuoteRequest(policyId, vehicle));
            yield put(push(`/app/dashboard/motor/${policyId}/quote`))
        }
    }
}
