import {ICreatePolicyFormValues, IMotorPolicy, IPatchPolicyFormValues, IPolicy} from '../interfaces/policies';
import {
    CREATE_POLICY,
    SET_MOTOR_POLICIES,
    PATCH_POLICY,
    UPDATE_POLICY,
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

export const patchPolicy = (values: IPatchPolicyFormValues, policyId: number) => ({
    type: PATCH_POLICY,
    values,
    policyId,
});

export const updatePolicy = (policy: IPolicy) => ({
    type: UPDATE_POLICY,
    policy,
});

export const setLoading = (isLoading: boolean) => ({
    type: SET_LOADING,
    isLoading,
});