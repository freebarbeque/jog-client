// @flow
import moment from 'moment'
import uuid from 'uuid/v4'
import firebase from 'firebase'

import type { MotorPolicyMap } from './types'
import { updatePolicies } from './data/policies'

export function generateMockPolicies(uid: string) {
  const policies: MotorPolicyMap = {}
  let guid = uuid()
  policies[guid] = {
    vehicleRegistration: 'Chrysler Pacifica',
    levelOfCover: 'comprehensive',
    id: guid,
    policyNo: '1234567',
    expiryDate: moment().add({ days: 64 }).toDate().getTime(),
    startDate: moment().subtract({ days: 100 }).toDate().getTime(),
    uid: uid,
    jogCreatedDate: firebase.database.ServerValue.TIMESTAMP,
    companyId: 'admiral',
    documentPaths: [],
    excess: 400,
    type: 'motor',
    drivers: [
      {
        firstNames: 'Richard',
        lastName: 'Gill'
      }
    ],
    noClaimsBonus: 4,
  }
  guid = uuid()
  policies[guid] = {
    vehicleRegistration: 'Ford Focus',
    levelOfCover: 'comprehensive',
    id: guid,
    policyNo: '1234568',
    expiryDate: moment().add({ days: 64 }).toDate().getTime(),
    startDate: moment().subtract({ days: 100 }).toDate().getTime(),
    uid: uid,
    jogCreatedDate: firebase.database.ServerValue.TIMESTAMP,
    companyId: 'hastings',
    documentPaths: [],
    excess: 500,
    type: 'motor',
    drivers: [
      {
        firstNames: 'Richard',
        lastName: 'Gill'
      }
    ],
    noClaimsBonus: 4,
  }

  return updatePolicies(policies).then(() => {
    console.info('Added mock policies')
  }).catch((err) => {
    console.error('Error adding mock policies', err.stack)
  })
}
