import {SET_MOTOR_POLICIES} from '../constants/policies';
import {IMotorPolicy} from "~/common/interfaces/policies";

export function setMotorPolicies (policies: IMotorPolicy[]) { //todo: use policy type instead of any
    return {
        type: SET_MOTOR_POLICIES,
        policies,
    }
}