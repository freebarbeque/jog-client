export interface ISyncUserDataAction {
  type: 'SYNC_USER_DATA'
  uid: string
}

export interface IUnsyncUserDataAction {
  type: 'UNSYNC_USER_DATA'
  uid: string
}

export interface ISyncDataAction {
  type: 'SYNC_DATA'
}

export type BaseAction =
  | ISyncUserDataAction
  | IUnsyncUserDataAction
  | ISyncDataAction
