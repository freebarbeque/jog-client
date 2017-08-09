import { IFirebaseUser, IUserDetails } from '../../types'

import {
  AuthAction,
  ILogoutAction,
  IPollRefreshUserAction,
  IStopPollingRefreshUserAction,
  ISyncUserAction,
} from './actionTypes'

export function receiveUser(user: IFirebaseUser | null): AuthAction {
  return {
    type: 'auth/RECEIVE_USER',
    user,
  }
}

export function receiveUserDetails(details: IUserDetails): AuthAction {
  return {
    type: 'auth/RECEIVE_USER_DETAILS',
    details,
  }
}

export function updateUserDetails(
  details: IUserDetails,
  silent: boolean = false,
): AuthAction {
  return {
    type: 'auth/UPDATE_USER_DETAILS',
    details,
    silent,
  }
}

export function updateUserProfilePicture(opts: {
  file?: any
  fileUrl?: string
}): AuthAction {
  return {
    type: 'auth/UPDATE_USER_PROFILE_PICTURE',
    ...opts,
  }
}

export function pollRefreshUser(): IPollRefreshUserAction {
  return {
    type: 'auth/POLL_REFRESH_USER',
  }
}

export function syncUser(): ISyncUserAction {
  return {
    type: 'auth/SYNC_USER',
  }
}

export function stopPollingRefreshUser(): IStopPollingRefreshUserAction {
  return {
    type: 'auth/STOP_POLL_REFRESH_USER',
  }
}

export function logout(): ILogoutAction {
  return {
    type: 'auth/LOGOUT',
  }
}
