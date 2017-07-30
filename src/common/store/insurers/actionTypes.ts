import { InsurerMap } from '../../types'

export type ReceiveInsurers = {
  type: 'insurers/RECEIVE_INSURERS'
  insurers: InsurerMap
}

export type SyncInsurers = {
  type: 'insurers/SYNC_INSURERS'
}

export type InsurerActions = ReceiveInsurers | SyncInsurers
