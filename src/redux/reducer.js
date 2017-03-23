// @flow

import type { Action, RootReduxState } from './typedefs'

const DEFAULT_STATE = { dummy: 5 }

export default function reducer(
  state: RootReduxState = DEFAULT_STATE,
  action: Action,
) : RootReduxState {
  if (action.type === 'DUMMY_ACTION') {
    return {
      ...state,
      dummy: action.dummy,
    }
  }
  return state
}
