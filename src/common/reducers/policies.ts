import {IPoliciesReduxState} from '../interfaces/policies';
import {IAction} from '../interfaces/action';
import {SET_MOTOR_POLICIES} from '../constants/policies';

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

        default: {
            return state;
        }
    }
}