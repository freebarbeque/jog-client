// @flow

import type { SyncDataAction, SyncUserDataAction, UnsyncUserDataAction } from './actionTypes'

export function syncUserData(uid: string) : SyncUserDataAction {
  return {
    type: 'SYNC_USER_DATA',
    uid,
  }
}


export function unsyncUserData(uid: string) : UnsyncUserDataAction {
  return {
    type: 'UNSYNC_USER_DATA',
    uid,
  }
}

export function syncData() : SyncDataAction {
  return {
    type: 'SYNC_DATA',
  }
}
