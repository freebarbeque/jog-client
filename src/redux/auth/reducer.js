// @flow

import type { AuthReduxState } from 'jog/src/types'
import type { AuthAction } from './actionTypes'

const DEFAULT_STATE = { user: null }

export default function reducer(
  state: AuthReduxState = DEFAULT_STATE,
  action: AuthAction,
) : AuthReduxState {
  if (action.type === 'auth/RECEIVE_USER') {
    return {
      ...state,
      user: action.user,
    }
  }
  return state
}
