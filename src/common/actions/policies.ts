import {ICreatePolicyFormValues, IMotorPolicy} from '../interfaces/policies';
import {
    CREATE_POLICY,
    SET_MOTOR_POLICIES,
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