// @flow

import type { AddManualPolicyAction, ManualPolicyUpdate } from './actions'

export default function reducer(
  state: ManualPolicyUpdate = {},
  action: AddManualPolicyAction,
): ManualPolicyUpdate {
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
