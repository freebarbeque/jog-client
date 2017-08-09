import {
  ISyncDataAction,
  ISyncUserDataAction,
  IUnsyncUserDataAction,
} from './actionTypes'

export function syncUserData(uid: string): ISyncUserDataAction {
  return {
    type: 'SYNC_USER_DATA',
    uid,
  }
}

export function unsyncUserData(uid: string): IUnsyncUserDataAction {
  return {
    type: 'UNSYNC_USER_DATA',
    uid,
  }
}

export function syncData(): ISyncDataAction {
  return {
    type: 'SYNC_DATA',
  }
}
