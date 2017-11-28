import {ICreatePolicyFormValues, IMotorPolicy, IPatchPolicyFormValues} from '../interfaces/policies';
import {
    CREATE_POLICY,
    SET_MOTOR_POLICIES,
    PATCH_POLICY,
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