import { InsurerMap } from '../../types'
import { IReceiveInsurers, ISyncInsurers } from './actionTypes'

export function receiveInsurers(insurers: InsurerMap): IReceiveInsurers {
  return {
    type: 'insurers/RECEIVE_INSURERS',
    insurers,
  }
}

export function syncInsurers(): ISyncInsurers {
  return {
    type: 'insurers/SYNC_INSURERS',
  }
}
