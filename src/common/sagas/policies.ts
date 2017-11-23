import {put, race, select, take} from 'redux-saga/effects';
import {CREATE_POLICY, CREATE_POLICY_FORM, MOTOR_POLICY} from '../constants/policies';
import {createPolicy, getInsuranceCompanies} from '../api/policies';
import {setDataSource} from '../actions/dataSource';
import {mapCreatePolicyFormValues} from '../utils/policies';
import {getUser} from '../selectors/auth';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {stopSubmit} from 'redux-form';

export function* createPolicyFlow() {
    const {insurance_companies} = yield getInsuranceCompanies();
    yield put(setDataSource('insuranceCompanies', insurance_companies.map(ic => ({id: ic.id, name: ic.name}))));

    const user = yield select(getUser);

    while (true) {
        const {create, location} = yield race({
            create: take(CREATE_POLICY),
            location: take(LOCATION_CHANGE),
        });

        if (location) {
            break;
        }

        const {values} = create;
        try {
            const mappedValues = mapCreatePolicyFormValues(values);
            yield createPolicy(user.id, MOTOR_POLICY, mappedValues);
            yield put(push('/app/dashboard'))
        } catch (err) {
            console.error(err);
            yield put(stopSubmit(CREATE_POLICY_FORM, {_error: err.message}))
            continue;
        }
    }
}