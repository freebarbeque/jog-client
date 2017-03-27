// @flow

import type { User } from '../../data/typedefs'

export type ReceiveUserAction = {
  type: 'auth/RECEIVE_USER',
  user: User | null
}

export type AuthAction = ReceiveUserAction
