// @flow

import type { PoliciesState } from 'jog/src/types'
import type { PoliciesAction } from './actionTypes'

const DEFAULT_STATE = {
  initialised: false,
  policies: {},
}

export default function reducer(
  state: PoliciesState = DEFAULT_STATE,
  action: PoliciesAction,
): PoliciesState {
  if (action.type === 'policies/RECEIVE_MOTOR_POLICIES') {
    return {
      ...state,
      initialised: true,
      policies: action.policies,
    }
  }
  return state
}
