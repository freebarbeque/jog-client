import { InsurersReduxState } from '../../types'
import { IReceiveInsurers } from './actionTypes'

const DEFAULT_STATE = {
  initialised: false,
  insurers: {},
}

export default function reducer(
  state: InsurersReduxState = DEFAULT_STATE,
  action: IReceiveInsurers,
): InsurersReduxState {
  if (action.type === 'insurers/RECEIVE_INSURERS') {
    return {
      initialised: true,
      insurers: action.insurers,
    }
  }
  return state
}
