// @flow

import type { PoliciesState } from 'jog/src/types'
import type { PoliciesAction } from './actionTypes'

const DEFAULT_STATE = []

export default function reducer(state: PoliciesState = DEFAULT_STATE, action: PoliciesAction) : PoliciesState {
  if (action.type === 'RECEIVE_MOTOR_POLICIES') {
    return action.policies
  }
  return state
}
