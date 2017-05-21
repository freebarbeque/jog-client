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
import {constructExpiredNotificationBody, constructExpiryNotificationBody} from '../functions/push'

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

describe('expiry notification body', function() {
  it('days greater than 1 constructed correctly', async () => {
    const mockPolicies: {[id: string]: MotorPolicy} = {
      ...generatePolicy(moment().add(5, 'days').toDate().getTime())
    }
    await data.setPolicies(mockPolicies)
    let policy = _.values(mockPolicies)[0]

    const body = constructExpiryNotificationBody(policy, 5)
    expect(body).toEqual(expect.stringContaining('5 days'))
  })

  it('days equal to 1 constructed correctly', async () => {
    const mockPolicies: {[id: string]: MotorPolicy} = {
      ...generatePolicy(moment().add(1, 'days').toDate().getTime())
    }
    await data.setPolicies(mockPolicies)
    let policy = _.values(mockPolicies)[0]

    const body = constructExpiryNotificationBody(policy, 1)
    console.log('body', body)
    expect(body).toEqual(expect.stringContaining('1 day'))
    expect(body).not.toEqual(expect.stringContaining('1 days'))
  })
})

describe('expired notification body', function() {
  it('days greater than 1 constructed correctly', async () => {
    const mockPolicies: {[id: string]: MotorPolicy} = {
      ...generatePolicy(moment().subtract(5, 'days').toDate().getTime())
    }
    await data.setPolicies(mockPolicies)
    let policy = _.values(mockPolicies)[0]

    const body = constructExpiredNotificationBody(policy, 5)
    expect(body).toEqual(expect.stringContaining('5 days'))
  })

  it('days equal to 1 constructed correctly', async () => {
    const mockPolicies: {[id: string]: MotorPolicy} = {
      ...generatePolicy(moment().subtract(1, 'days').toDate().getTime())
    }
    await data.setPolicies(mockPolicies)
    let policy = _.values(mockPolicies)[0]

    const body = constructExpiredNotificationBody(policy, 1)
    console.log('body', body)
    expect(body).toEqual(expect.stringContaining('1 day'))
    expect(body).not.toEqual(expect.stringContaining('1 days'))
  })
})

