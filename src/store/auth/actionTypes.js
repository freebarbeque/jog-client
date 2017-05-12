// @flow

import type { FirebaseUser, UserDetails } from 'jog/src/types'

export type ReceiveUserAction = {
  type: 'auth/RECEIVE_USER',
  user: FirebaseUser | null
}

export type ReceiveUserDetails = {
  type: 'auth/RECEIVE_USER_DETAILS',
  details: UserDetails | null
}


export type PollRefreshUserAction = {
  type: 'auth/POLL_REFRESH_USER',
}

export type SyncUserAction = {
  type: 'auth/SYNC_USER',
}

export type StopPollingRefreshUserAction = {
  type: 'auth/STOP_POLL_REFRESH_USER'
}

export type LogoutAction = {
  type: 'auth/LOGOUT',
}

export type AuthAction = ReceiveUserAction | LogoutAction | ReceiveUserDetails
