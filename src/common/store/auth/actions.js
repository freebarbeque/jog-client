// @flow

import type { FirebaseUser, UserDetails } from '../../types'

import type {
  AuthAction,
  LogoutAction,
  PollRefreshUserAction,
  StopPollingRefreshUserAction,
  SyncUserAction,
} from './actionTypes'

export function receiveUser(user: FirebaseUser | null): AuthAction {
  return {
    type: 'auth/RECEIVE_USER',
    user,
  }
}

export function receiveUserDetails(details: UserDetails): AuthAction {
  return {
    type: 'auth/RECEIVE_USER_DETAILS',
    details,
  }
}

export function updateUserDetails(
  details: UserDetails,
  silent: boolean = false,
): AuthAction {
  return {
    type: 'auth/UPDATE_USER_DETAILS',
    details,
    silent,
  }
}

export function updateUserProfilePicture(fileUrl: string): AuthAction {
  return {
    type: 'auth/UPDATE_USER_PROFILE_PICTURE',
    fileUrl,
  }
}

export function pollRefreshUser(): PollRefreshUserAction {
  return {
    type: 'auth/POLL_REFRESH_USER',
  }
}

export function syncUser(): SyncUserAction {
  return {
    type: 'auth/SYNC_USER',
  }
}

export function stopPollingRefreshUser(): StopPollingRefreshUserAction {
  return {
    type: 'auth/STOP_POLL_REFRESH_USER',
  }
}

export function logout(): LogoutAction {
  return {
    type: 'auth/LOGOUT',
  }
}
