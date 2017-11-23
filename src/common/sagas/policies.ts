import {put, take} from 'redux-saga/effects';
import {CREATE_POLICY} from '../constants/policies';
import {getInsuranceCompanies} from '../api/policies';
import {setDataSource} from '../actions/dataSource';
import {getCreatePolicyQueryString, mapCreatePolicyFormValues} from '../utils/policies';

export function* createPolicyFlow() {
    const {insurance_companies} = yield getInsuranceCompanies();
    yield put(setDataSource('insuranceCompanies', insurance_companies.map(ic => ({id: ic.id, name: ic.name}))));

    while (true) {
        const {values} = yield take(CREATE_POLICY);
        const mappedValues = mapCreatePolicyFormValues(values);
        console.log(getCreatePolicyQueryString(mappedValues));
    }
}