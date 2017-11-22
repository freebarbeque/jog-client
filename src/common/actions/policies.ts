import {CREATE_POLICY, SET_MOTOR_POLICIES} from '../constants/policies';
import {ICreatePolicyFormValues, IMotorPolicy} from '../interfaces/policies';

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