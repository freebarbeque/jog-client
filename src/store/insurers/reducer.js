// @flow

import type { InsurersReduxState } from 'jog/src/types'
import type { ReceiveInsurers } from './actionTypes'

const DEFAULT_STATE = {
  initialised: false,
  insurers: {},
}

export default function reducer(
  state: InsurersReduxState = DEFAULT_STATE,
  action: ReceiveInsurers,
): InsurersReduxState {
  if (action.type === 'insurers/RECEIVE_INSURERS') {
    return {
      initialised: true,
      insurers: action.insurers,
    }
  }
  return state
}
