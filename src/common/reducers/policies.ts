import {IPoliciesReduxState} from '../interfaces/policies';
import {IAction} from '../interfaces/action';
import {SET_MOTOR_POLICIES, UPDATE_POLICY} from '../constants/policies';

const defaultState = {
    motorPolicies: null,
}

export default function (state: IPoliciesReduxState = defaultState, action: IAction) {
    switch (action.type) {
        case (SET_MOTOR_POLICIES): {
            return {
                ...state,
                motorPolicies: action.policies,
            };
        }

        case (UPDATE_POLICY): {
            return {
                ...state,
                motorPolicies: state.motorPolicies && state.motorPolicies.map(p => p.id === action.policy.id ? Object.assign({}, p, action.policy) : p),
            };
        }

        default: {
            return state;
        }
    }
}