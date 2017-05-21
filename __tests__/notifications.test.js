/*
 globals it, expect, jasmine
 @flow
 */

import moment from 'moment'
import _ from 'lodash'
import uuid from 'uuid/v4'

import * as data from '../functions/data'
import type {MotorPolicy} from '../src/types'
import {LEVEL_OF_COVER} from '../src/types'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

function generatePolicy(expiryDate) {
  const id = uuid()
  const ret = {}
  ret[id] = {
    id: id,
    type: 'motor',
    vehicleRegistration: 'WR09GKA',
    levelOfCover: LEVEL_OF_COVER.comprehensive,
    policyNo: 'xyz',
    companyId: 'admiral',
    cost: 123,
    expiryDate: expiryDate,
    startDate: moment().subtract(340, 'days').toDate().getTime()
  }
  return ret
}

it('selects policies that will expire within 30 days', async () => {
  const mockPolicies: {[id: string]: MotorPolicy} = {
    ...generatePolicy(moment().add(5, 'days').toDate().getTime()),
    ...generatePolicy(moment().add(40, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(3, 'days').toDate().getTime()),
  }

  await data.setPolicies(mockPolicies)
  const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
  expect(policies).toHaveLength(1)
})

it('select expired policies', async () => {
  const mockPolicies: {[id: string]: MotorPolicy} = {
    ...generatePolicy(moment().add(5, 'days').toDate().getTime()),
    ...generatePolicy(moment().add(40, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(3, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(39, 'days').toDate().getTime()),
  }

  await data.setPolicies(mockPolicies)
  const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
  expect(policies).toHaveLength(2)
})

it('mark expiry', async () => {
  const mockPolicies: {[id: string]: MotorPolicy} = {
    ...generatePolicy(moment().add(5, 'days').toDate().getTime())
  }
  await data.setPolicies(mockPolicies)

  let policy = _.values(mockPolicies)[0]
  await data.markExpiryNotificationSent(policy.id, 5)
  policy = await data.fetchPolicy(policy.id)
  console.log('policy', policy)
  expect(policy.notifications.expiry).toEqual(5)
})

it('mark expired', async () => {
  const mockPolicies: {[id: string]: MotorPolicy} = {
    ...generatePolicy(moment().subtract(5, 'days').toDate().getTime())
  }
  await data.setPolicies(mockPolicies)

  let policy = _.values(mockPolicies)[0]
  await data.markExpiredNotificationSent(policy.id, 5)
  policy = await data.fetchPolicy(policy.id)
  console.log('policy', policy)
  expect(policy.notifications.expired).toEqual(5)
})
