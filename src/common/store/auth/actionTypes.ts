// @flow

import { IFirebaseUser, IUserDetails } from '../../types'

export interface IReceiveUserAction {
  type: 'auth/RECEIVE_USER'
  user: IFirebaseUser | null
}

export interface IReceiveUserDetails {
  type: 'auth/RECEIVE_USER_DETAILS'
  details: IUserDetails | null
}

export interface IUpdateUserDetails {
  type: 'auth/UPDATE_USER_DETAILS'
  details: IUserDetails
  silent?: boolean
}

export interface IUpdateUserProfilePicture {
  type: 'auth/UPDATE_USER_PROFILE_PICTURE'
  fileUrl?: string
  file?: any
}

export interface IPollRefreshUserAction {
  type: 'auth/POLL_REFRESH_USER'
}

export interface ISyncUserAction {
  type: 'auth/SYNC_USER'
}

export interface IStopPollingRefreshUserAction {
  type: 'auth/STOP_POLL_REFRESH_USER'
}

export interface ILogoutAction {
  type: 'auth/LOGOUT'
}

export type AuthAction =
  | IReceiveUserAction
  | ILogoutAction
  | IReceiveUserDetails
  | IUpdateUserDetails
  | IUpdateUserProfilePicture
  | IPollRefreshUserAction
  | IStopPollingRefreshUserAction
