// @flow

import { FirebaseUser, UserDetails } from '../../types'

export type ReceiveUserAction = {
  type: 'auth/RECEIVE_USER'
  user: FirebaseUser | null
}

export type ReceiveUserDetails = {
  type: 'auth/RECEIVE_USER_DETAILS'
  details: UserDetails | null
}

export type UpdateUserDetails = {
  type: 'auth/UPDATE_USER_DETAILS'
  details: UserDetails
  silent?: boolean
}

export type UpdateUserProfilePicture = {
  type: 'auth/UPDATE_USER_PROFILE_PICTURE'
  fileUrl?: string
  file?: any
}

export type PollRefreshUserAction = {
  type: 'auth/POLL_REFRESH_USER'
}

export type SyncUserAction = {
  type: 'auth/SYNC_USER'
}

export type StopPollingRefreshUserAction = {
  type: 'auth/STOP_POLL_REFRESH_USER'
}

export type LogoutAction = {
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
