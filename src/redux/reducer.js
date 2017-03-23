// @flow

import type { Action, RootReduxState } from './typedefs'

const DEFAULT_STATE = { dummy: 5, user: null }

export default function reducer(
  state: RootReduxState = DEFAULT_STATE,
  action: Action,
) : RootReduxState {
  if (action.type === 'DUMMY_ACTION') {
    return {
      ...state,
      dummy: action.dummy,
    }
  } else if (action.type === 'RECEIVE_USER') {
    return {
      ...state,
      user: action.user,
    }
  }
  return state
}
