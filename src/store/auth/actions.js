// @flow

import type { FirebaseUser } from 'jog/src/types'
import type { AuthAction, PollRefreshUserAction, StopPollingRefreshUserAction } from './actionTypes'

export function receiveUser(user: FirebaseUser | null): AuthAction {
  return {
    type: 'auth/RECEIVE_USER',
    user,
  }
}

export function pollRefreshUser() : PollRefreshUserAction {
  return {
    type: 'auth/POLL_REFRESH_USER'
  }
}

export function stopPollingRefreshUser() : StopPollingRefreshUserAction {
  return {
    type: 'auth/STOP_POLL_REFRESH_USER'
  }
}
