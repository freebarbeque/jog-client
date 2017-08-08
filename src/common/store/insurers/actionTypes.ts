import { InsurerMap } from '../../types'

export interface ReceiveInsurers {
  type: 'insurers/RECEIVE_INSURERS'
  insurers: InsurerMap
}

export interface SyncInsurers {
  type: 'insurers/SYNC_INSURERS'
}

export type InsurerActions = ReceiveInsurers | SyncInsurers
