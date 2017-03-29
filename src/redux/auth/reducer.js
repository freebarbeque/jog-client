// @flow

import type { AuthAction } from './actionTypes'
import type { User } from '../../data/typedefs'

const DEFAULT_STATE = { user: null }

export type AuthReduxState = {
  user: User | null
}

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
