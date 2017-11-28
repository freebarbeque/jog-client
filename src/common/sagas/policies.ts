import {put, race, select, take} from 'redux-saga/effects';
import {
    CREATE_POLICY,
    CREATE_POLICY_FORM,
    EDIT_OVERVIEW_MODAL,
    MOTOR_POLICY,
    PATCH_POLICY,
    EDIT_POLICY_OVERVIEW_FORM,
} from '../constants/policies';
import {createPolicy, getInsuranceCompanies, getPolicies, patchPolicy} from '../api/policies';
import {setDataSource} from '../actions/dataSource';
import {mapCreatePolicyFormValues, mapPatchPolicyFormValues} from '../utils/policies';
import {getUser} from '../selectors/auth';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {stopSubmit} from 'redux-form';
import {setMotorPolicies, updatePolicy} from '../actions/policies';
import {closeModal} from 'src/web/actions/page';

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

export function* motorPoliciesContentFlow() {
    const user = yield select(getUser);
    const {motor_policies} = yield getPolicies(MOTOR_POLICY, user.id);

    if (motor_policies) {
        yield put(setMotorPolicies(motor_policies));
    }
}

export function* patchPolicyFlow() {
    const user = yield select(getUser);

    while (true) {
        const {patch, location} = yield race({
            patch: take(PATCH_POLICY),
            location: take(LOCATION_CHANGE),
        });

        if (location) {
            break;
        }

        const {values, policyId} = patch;

        try {
            const mappedValues = mapPatchPolicyFormValues(values);
            const patchedPolicy = yield patchPolicy(user.id, MOTOR_POLICY, mappedValues, policyId);
            yield put(updatePolicy(patchedPolicy));
            yield put(closeModal(EDIT_OVERVIEW_MODAL));
        } catch (err) {
            console.error(err);
            yield put(stopSubmit(EDIT_POLICY_OVERVIEW_FORM, {_error: err.message}));
            continue;
        }
    }
}