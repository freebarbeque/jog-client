// @flow

import type { FirebaseUser } from 'jog/src/types'

export type ReceiveUserAction = {
  type: 'auth/RECEIVE_USER',
  user: FirebaseUser | null
}

export type AuthAction = ReceiveUserAction
