import {IReduxState} from '../interfaces/store';
import {MOTOR_POLICY} from '../constants/policies';

export const getPolicies = (policyType: string) => (state: IReduxState) => {
    switch (policyType) {
        case MOTOR_POLICY: {
            return state.policies.motorPolicies;
        }

        default: {
            throw new Error('Unknown policy type');
        }
    }
}