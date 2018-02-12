import {ICreatePolicyFormValues, IMotorPolicy, IPatchPolicyFormValues, IPolicy} from '../interfaces/policies';
import {
    CREATE_POLICY,
    SET_MOTOR_POLICIES,
    PATCH_POLICY,
    UPDATE_POLICY,
    REMOVE_POLICY,
    UPDATE_REMOVE_POLICY,
    SET_LOADING,
} from '../constants/policies';

export function setMotorPolicies (policies: IMotorPolicy[]) { // todo: use policy type instead of any
    return {
        type: SET_MOTOR_POLICIES,
        policies,
    }
}

export function createPolicy (values: ICreatePolicyFormValues) {
    return {
        type: CREATE_POLICY,
        values,
    }
}

export const patchPolicy = (values: IPatchPolicyFormValues, policyId: number, modalId: string, formId: string) => ({
    type: PATCH_POLICY,
    values,
    policyId,
    modalId,
    formId,
});

export const updatePolicy = (policy: IPolicy) => ({
    type: UPDATE_POLICY,
    policy,
});

export const removePolicy = (policyId: string | number) => ({
    type: REMOVE_POLICY,
    policyId,
});

export const updateRemovePolicy = (id: string | number) => ({
    type: UPDATE_REMOVE_POLICY,
    id
});

export const setLoading = (isLoading: boolean) => ({
    type: SET_LOADING,
    isLoading,
});
