// @flow

import type { FirebaseUser } from 'jog/src/types'
import type { AuthAction } from './actionTypes'

export function receiveUser(user: FirebaseUser | null): AuthAction {
  return {
    type: 'auth/RECEIVE_USER',
    user,
  }
}

