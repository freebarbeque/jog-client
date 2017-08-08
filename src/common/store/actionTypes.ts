export interface SyncUserDataAction {
  type: 'SYNC_USER_DATA'
  uid: string
}

export interface UnsyncUserDataAction {
  type: 'UNSYNC_USER_DATA'
  uid: string
}

export interface SyncDataAction {
  type: 'SYNC_DATA'
}

export type BaseAction =
  | SyncUserDataAction
  | UnsyncUserDataAction
  | SyncDataAction
