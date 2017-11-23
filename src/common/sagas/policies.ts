import {put, select, take} from 'redux-saga/effects';
import {CREATE_POLICY, MOTOR_POLICY} from '../constants/policies';
import {createPolicy, getInsuranceCompanies} from '../api/policies';
import {setDataSource} from '../actions/dataSource';
import {mapCreatePolicyFormValues} from '../utils/policies';
import {getUser} from '../selectors/auth';

export function* createPolicyFlow() {
    const {insurance_companies} = yield getInsuranceCompanies();
    yield put(setDataSource('insuranceCompanies', insurance_companies.map(ic => ({id: ic.id, name: ic.name}))));

    const user = yield select(getUser);

    while (true) {
        const {values} = yield take(CREATE_POLICY);
        const mappedValues = mapCreatePolicyFormValues(values);
        yield createPolicy(user.id, MOTOR_POLICY, mappedValues);
    }
}