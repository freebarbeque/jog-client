import {take} from 'redux-saga/effects';
import {CREATE_POLICY} from '~/common/constants/policies';
import {getInsuranceCompanies} from "~/common/api/policies";

export function* createPolicyFlow() {
    const {insurance_companies} = yield getInsuranceCompanies();
    console.log(insurance_companies);

    const {values} = yield take(CREATE_POLICY);
    console.log(values);
}