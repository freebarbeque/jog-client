export type SyncUserDataAction = {
  type: 'SYNC_USER_DATA'
  uid: string
}

export type UnsyncUserDataAction = {
  type: 'UNSYNC_USER_DATA'
  uid: string
}

export type SyncDataAction = {
  type: 'SYNC_DATA'
}

export type BaseAction =
  | SyncUserDataAction
  | UnsyncUserDataAction
  | SyncDataAction
