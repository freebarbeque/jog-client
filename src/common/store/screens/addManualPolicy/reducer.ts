import { AddManualPolicyAction, IManualPolicyUpdate } from './actions'

export default function reducer(
  state: IManualPolicyUpdate = {},
  action: AddManualPolicyAction,
): IManualPolicyUpdate {
  if (action.type === 'addManualPolicy/UPDATE_MANUAL_POLICY') {
    return {
      ...state,
      ...action.update,
    }
  } else if (action.type === 'addManualPolicy/CLEAR_MANUAL_POLICY') {
    return {}
  }

  return state
}
