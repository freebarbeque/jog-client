import {put, race, select, take, fork, cancel} from 'redux-saga/effects';
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
import {setMotorPolicies, updatePolicy, setLoading} from '../actions/policies';
import {closeModal} from '../../web/actions/page';

export function* createPolicyWorker() {
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

        yield put(setLoading(true));
        const {values} = create;
        try {
            const mappedValues = mapCreatePolicyFormValues(values);
            yield createPolicy(user.id, MOTOR_POLICY, mappedValues);
            yield put(push('/app/dashboard/motor'));
            yield put(setLoading(false));
        } catch (err) {
            console.error(err);
            yield put(stopSubmit(CREATE_POLICY_FORM, {_error: err.message}));
            yield put(setLoading(false));
            continue;
        }
    }
}

export function* createPolicyFlow() {
    const worker = yield fork(createPolicyWorker);
    yield take(LOCATION_CHANGE);
    yield put(setLoading(false));
    yield cancel(worker);
}

export function* motorPoliciesContentFlow() {
    const user = yield select(getUser);
    const {motor_policies} = yield getPolicies(MOTOR_POLICY, user.id);

    if (motor_policies) {
        yield put(setMotorPolicies(motor_policies));
    }
}

export function* patchPolicyWorker() {
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
            yield put(setLoading(true));
            const mappedValues = mapPatchPolicyFormValues(values);
            const patchedPolicy = yield patchPolicy(user.id, MOTOR_POLICY, mappedValues, policyId);
            yield put(updatePolicy(patchedPolicy));
            yield put(closeModal(EDIT_OVERVIEW_MODAL));
            yield put(setLoading(false));
        } catch (err) {
            console.error(err);
            yield put(stopSubmit(EDIT_POLICY_OVERVIEW_FORM, {_error: err.message}));
            yield put(setLoading(false));
            continue;
        }
    }
}

export function* patchPolicyFlow() {
    const worker = yield fork(patchPolicyWorker);
    yield take(LOCATION_CHANGE);
    yield put(setLoading(false));
    yield cancel(worker);
}