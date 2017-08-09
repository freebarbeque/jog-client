import { InsurerMap } from '../../types'

export interface IReceiveInsurers {
  type: 'insurers/RECEIVE_INSURERS'
  insurers: InsurerMap
}

export interface ISyncInsurers {
  type: 'insurers/SYNC_INSURERS'
}

export type InsurerActions = IReceiveInsurers | ISyncInsurers
