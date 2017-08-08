// @flow

import { FirebaseUser, UserDetails } from '../../types'

export interface ReceiveUserAction {
  type: 'auth/RECEIVE_USER'
  user: FirebaseUser | null
}

export interface ReceiveUserDetails {
  type: 'auth/RECEIVE_USER_DETAILS'
  details: UserDetails | null
}

export interface UpdateUserDetails {
  type: 'auth/UPDATE_USER_DETAILS'
  details: UserDetails
  silent?: boolean
}

export interface UpdateUserProfilePicture {
  type: 'auth/UPDATE_USER_PROFILE_PICTURE'
  fileUrl?: string
  file?: any
}

export interface PollRefreshUserAction {
  type: 'auth/POLL_REFRESH_USER'
}

export interface SyncUserAction {
  type: 'auth/SYNC_USER'
}

export interface StopPollingRefreshUserAction {
  type: 'auth/STOP_POLL_REFRESH_USER'
}

export interface LogoutAction {
  type: 'auth/LOGOUT'
}

export type AuthAction =
  | ReceiveUserAction
  | LogoutAction
  | ReceiveUserDetails
  | UpdateUserDetails
  | UpdateUserProfilePicture
  | PollRefreshUserAction
  | StopPollingRefreshUserAction
