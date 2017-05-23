// @flow

import type { InsurerMap } from 'jog/src/types'
import type { ReceiveInsurers, SyncInsurers } from './actionTypes'

export function receiveInsurers(insurers: InsurerMap): ReceiveInsurers {
  return {
    type: 'insurers/RECEIVE_INSURERS',
    insurers,
  }
}

export function syncInsurers(): SyncInsurers {
  return {
    type: 'insurers/SYNC_INSURERS',
  }
}
