// @flow

import 'jog/globals'
import firebase from 'firebase'
import type {MotorPolicy} from '../../src/types'
import { setMotorPolicy } from  '../../src/data/policies'

import moment from 'moment'

import initialiseFirebase from '../../src/data'

initialiseFirebase()

const policies: MotorPolicy[] = [
  {
    vehicleRegistration: 'Chrysler Pacifica',
    levelOfCover: 'comprehensive',
    id: 'awesomepolicy',
    policyNo: '1234567',
    expiryDate: moment().add({days: 64}).toDate().getTime(),
    startDate: moment().subtract({days: 100}).toDate().getTime(),
    uid: 'cHuC2t8V5DcvLxdNhbCqjYhBA672',
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
]

Promise.all(
  policies.map(p => setMotorPolicy(p))
).then(() => {
  process.exit(0)
}).catch(err => {
  console.log('error creating policies...', err.stack)
})
