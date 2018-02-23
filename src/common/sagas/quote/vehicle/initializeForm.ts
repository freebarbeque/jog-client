import {put, select} from 'redux-saga/effects';
import {initialize, getFormValues} from 'redux-form';

import {getPolicies} from 'src/common/selectors/policies';
import {getPolicyQuoteRequest} from 'src/common/selectors/policyQuoteRequest';
import {getExternalVehicleInformation} from 'src/common/api/vehicle';

import {MOTOR_POLICY} from 'src/common/constants/policies';

function* initializeForm(formName: string, policyId: number|string) {
    try {
        const {vehicle} = yield select(getPolicyQuoteRequest, policyId);
        const formData = yield select(getFormValues(formName));

        if (vehicle) {
            yield put(initialize(formName, {
                ...formData,
                ...vehicle,
                ...(vehicle.value_cents ? { value_cents: Number(vehicle.value_cents) / 100 } : null), // should display result in pounds
                registration: vehicle.registration,
            }));
        } else {
            const policies = yield select(getPolicies(MOTOR_POLICY));
            const policy = policies.find(p => p.id === Number(policyId));

            if (policy && policy.vehicle_registration) {
                const vehicleData = yield getExternalVehicleInformation(policy.vehicle_registration);

                yield put(initialize(formName, {
                    ...formData,
                    ...vehicleData,
                    ...(vehicleData.value_cents ? { value_cents: Number(vehicleData.value_cents) / 100 } : null), // should display result in pounds
                    registration: policy.vehicle_registration,
                }));
            }
        }
    } catch (error) {
        console.log('Log => can not initialize QuoteVehicleForm: ', error);
    }
}

export default initializeForm;
