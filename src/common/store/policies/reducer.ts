import { IPoliciesState } from '../../types'
import { PoliciesAction } from './actionTypes'

const DEFAULT_STATE = {
  initialised: false,
  policies: {},
}

export default function reducer(
  state: IPoliciesState = DEFAULT_STATE,
  action: PoliciesAction,
): IPoliciesState {
  if (action.type === 'policies/RECEIVE_MOTOR_POLICIES') {
    return {
      ...state,
      initialised: true,
      policies: action.policies,
    }
  }
  return state
}
