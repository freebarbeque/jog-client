import {put, race, select, take, fork, cancel} from 'redux-saga/effects';
import {
    CREATE_POLICY,
    CREATE_POLICY_FORM,
    EDIT_OVERVIEW_MODAL,
    MOTOR_POLICY,
    PATCH_POLICY,
    REMOVE_POLICY,
    EDIT_POLICY_OVERVIEW_FORM,
} from '../constants/policies';
import {createPolicy, getInsuranceCompanies, getPolicies, patchPolicy, deletePolicy} from '../api/policies';
import {setDataSource} from '../actions/dataSource';
import {mapCreatePolicyFormValues, mapPatchPolicyFormValues} from '../utils/policies';
import {getUser} from '../selectors/auth';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {stopSubmit} from 'redux-form';
import {setMotorPolicies, updatePolicy, updateRemovePolicy, setLoading} from '../actions/policies';
import {closeModal} from '../../web/actions/page';

import {fetchDocuments} from '../api/documents';

export function* createPolicyWorker() {
    const {insurance_companies} = yield getInsuranceCompanies();
    yield put(setDataSource('insuranceCompanies', insurance_companies));

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

export function* patchPolicyWorker(policyId: string) {
    const user = yield select(getUser);

    yield fetchDocuments(user.id, policyId);

    while (true) {
        const {patch, location} = yield race({
            patch: take(PATCH_POLICY),
            location: take(LOCATION_CHANGE),
        });

        if (location) {
            break;
        }

        const { values, policyId, modalId, formId } = patch;

        try {
            yield put(setLoading(true));
            const mappedValues = mapPatchPolicyFormValues(values);
            const patchedPolicy = yield patchPolicy(user.id, MOTOR_POLICY, mappedValues, policyId);
            yield put(updatePolicy(patchedPolicy));
            yield put(closeModal(modalId));
            yield put(setLoading(false));
        } catch (err) {
            console.error(err);
            yield put(stopSubmit(formId, {_error: err.message}));
            yield put(setLoading(false));
            continue;
        }
    }
}

export function* patchPolicyFlow(policyId: string) {
    const worker = yield fork(patchPolicyWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setLoading(false));
    yield cancel(worker);
}

export function* removePolicyWorker(policyId: string) {
    const user = yield select(getUser);

    while (true) {
        const {remove, location} = yield race({
            remove: take(REMOVE_POLICY),
            location: take(LOCATION_CHANGE),
        });

        if (location) {
            break;
        }

        const { policyId } = remove;

        try {
            yield put(setLoading(true));
            const deletedPolicy = yield deletePolicy(user.id, MOTOR_POLICY, policyId);
            yield put(updateRemovePolicy(policyId));
            yield put(setLoading(false));
            yield put(push('/app/dashboard/motor'));
        } catch (err) {
            console.error(err);
            yield put(setLoading(false));
            continue;
        }
    }
}

export function* removePolicyFlow(policyId: string) {
    const worker = yield fork(removePolicyWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setLoading(false));
    yield cancel(worker);
}
