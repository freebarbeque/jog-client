/*
 globals it, expect, jasmine
 @flow
 */

import moment from 'moment'
import _ from 'lodash'
import uuid from 'uuid/v4'

import * as data from '../data'

import type {MotorPolicy} from '../../src/types'
import {LEVEL_OF_COVER} from '../../src/types'
import {setUser} from '../data'
import {setInsurers} from '../data'

let push = require('../push')
let functions = require('firebase-functions')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

function generatePolicy(expiryDate, notifications = {}) {
  const ret = {}
  const id = uuid()
  ret[id] = {
    id,
    type: 'motor',
    vehicleRegistration: 'WR09GKA',
    levelOfCover: LEVEL_OF_COVER.comprehensive,
    policyNo: 'xyz',
    companyId: 'admiral',
    cost: 123,
    expiryDate: expiryDate,
    startDate: moment().subtract(340, 'days').toDate().getTime(),
    uid: 'xyz',
    notifications
  }
  return ret
}

beforeEach(async function () {
  await setUser('xyz', {name: 'Richard', fcmToken: 'abc123'})
  await setInsurers({
    admiral: {
      name: 'Admiral'
    },
    hastings: {
      name: 'Hastings'
    }
  })
})

describe('policy selection', function () {
  it('expire within 30 days', async () => {
    const mockPolicies: {[id: string]: MotorPolicy} = {
      ...generatePolicy(moment().add(5, 'days').toDate().getTime()),
      ...generatePolicy(moment().add(40, 'days').toDate().getTime()),
      ...generatePolicy(moment().subtract(3, 'days').toDate().getTime()),
    }

    await data.setPolicies(mockPolicies)
    const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
    expect(policies).toHaveLength(1)
  })

  it('expired policies', async () => {
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

  describe("filtering", function () {
    describe('expiry', function () {
      it("one policy already notified at 30 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().add(31, 'days').toDate().getTime()),
          ...generatePolicy(moment().add(31, 'days').toDate().getTime(), {expiry: 30})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiringPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("one policy already notified at 20 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().add(21, 'days').toDate().getTime()),
          ...generatePolicy(moment().add(21, 'days').toDate().getTime(), {expiry: 20})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiringPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("one policy already notified at 5 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().add(6, 'days').toDate().getTime()),
          ...generatePolicy(moment().add(6, 'days').toDate().getTime(), {expiry: 5})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiringPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("one policy already notified at 0 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().add(1, 'days').toDate().getTime()),
          ...generatePolicy(moment().add(1, 'days').toDate().getTime(), {expiry: 0})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiringPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("19 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().add(20, 'days').toDate().getTime()),
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiringPolicies()
        expect(policies).toHaveLength(1)
        const filteredPolicies: MotorPolicy[] = data.filterExpiringPolicies(policies)
        expect(filteredPolicies).toHaveLength(0)
      })
    })

    describe('expired', function () {
      it("one policy already notified at 30 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().subtract(30, 'days').toDate().getTime()),
          ...generatePolicy(moment().subtract(30, 'days').toDate().getTime(), {expired: 30})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiredPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("one policy already notified at 20 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().subtract(20, 'days').toDate().getTime()),
          ...generatePolicy(moment().subtract(20, 'days').toDate().getTime(), {expired: 20})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiredPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("one policy already notified at 5 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().subtract(5, 'days').toDate().getTime()),
          ...generatePolicy(moment().subtract(5, 'days').toDate().getTime(), {expired: 5})
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
        expect(policies).toHaveLength(2)
        const filteredPolicies: MotorPolicy[] = data.filterExpiredPolicies(policies)
        expect(filteredPolicies).toHaveLength(1)
      })

      it("0 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().toDate().getTime()),
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
        expect(policies).toHaveLength(0)
      })

      it("19 days difference", async () => {
        const mockPolicies: {[id: string]: MotorPolicy} = {
          ...generatePolicy(moment().subtract(19, 'days').toDate().getTime()),
        }

        await data.setPolicies(mockPolicies)
        const policies: MotorPolicy[] = await data.fetchExpiredPolicies()
        expect(policies).toHaveLength(1)
        const filteredPolicies: MotorPolicy[] = data.filterExpiredPolicies(policies)
        expect(filteredPolicies).toHaveLength(0)
      })
    })
  })
})

describe('mark notifications sent', function () {
  it('expiry', async () => {
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

  it('expired', async () => {
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
})

describe('notification body', function () {
  describe('expiry', function() {
    it('days greater than 1 constructed correctly', async () => {
      const mockPolicies: {[id: string]: MotorPolicy} = {
        ...generatePolicy(moment().add(5, 'days').toDate().getTime())
      }
      await data.setPolicies(mockPolicies)
      let policy = _.values(mockPolicies)[0]

      const body = push.constructExpiryNotificationBody(policy, {name: 'Admiral'}, 5)
      expect(body).toEqual(expect.stringContaining('5 days'))
      expect(body).toEqual(expect.stringContaining('Admiral'))
    })

    it('days equal to 1 constructed correctly', async () => {
      const mockPolicies: {[id: string]: MotorPolicy} = {
        ...generatePolicy(moment().add(1, 'days').toDate().getTime())
      }
      await data.setPolicies(mockPolicies)
      let policy = _.values(mockPolicies)[0]

      const body = push.constructExpiryNotificationBody(policy, {name: 'Admiral'}, 1)
      console.log('body', body)
      expect(body).toEqual(expect.stringContaining('1 day'))
      expect(body).toEqual(expect.stringContaining('Admiral'))
      expect(body).not.toEqual(expect.stringContaining('1 days'))
    })
  })

  describe('expired', function() {
    it('days greater than 1 constructed correctly', async () => {
      const mockPolicies: {[id: string]: MotorPolicy} = {
        ...generatePolicy(moment().subtract(5, 'days').toDate().getTime())
      }
      await data.setPolicies(mockPolicies)
      let policy = _.values(mockPolicies)[0]

      const body = push.constructExpiredNotificationBody(policy, {name: 'Admiral'}, 5)
      expect(body).toEqual(expect.stringContaining('5 days'))
      expect(body).toEqual(expect.stringContaining('Admiral'))
    })

    it('days equal to 1 constructed correctly', async () => {
      const mockPolicies: {[id: string]: MotorPolicy} = {
        ...generatePolicy(moment().subtract(1, 'days').toDate().getTime())
      }
      await data.setPolicies(mockPolicies)
      let policy = _.values(mockPolicies)[0]

      const body = push.constructExpiredNotificationBody(policy, {name: 'Admiral'}, 1)
      console.log('body', body)
      expect(body).toEqual(expect.stringContaining('1 day'))
      expect(body).toEqual(expect.stringContaining('Admiral'))
      expect(body).not.toEqual(expect.stringContaining('1 days'))
    })
  })
})

it("notifications function", async () => {
  const mockPolicies: {[id: string]: MotorPolicy} = {
    ...generatePolicy(moment().subtract(5, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(20, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(14, 'days').toDate().getTime()),
    ...generatePolicy(moment().subtract(30, 'days').toDate().getTime()),
    ...generatePolicy(moment().add(21, 'days').toDate().getTime()),
    ...generatePolicy(moment().add(26, 'days').toDate().getTime()),
    ...generatePolicy(moment().add(41, 'days').toDate().getTime()),
  }
  await data.setPolicies(mockPolicies)

  const fakeEvent = {
    data: new functions.database.DeltaSnapshot(null, null, null, 'input'),
  }

  const admin = require('firebase-admin')
  const messagingMock = jest.fn()
  const sendToDeviceMock = jest.fn().mockReturnValue(Promise.resolve())

  messagingMock.mockReturnValue({
    sendToDevice: sendToDeviceMock
  });

  const oldMessaging = admin.messaging
  admin.messaging = messagingMock

  const hourly_job = require('../index').hourly_job
  await hourly_job(fakeEvent)

  expect(sendToDeviceMock.mock.calls).toHaveLength(4)

  sendToDeviceMock.mock.calls.forEach(call => {
    expect(call[1].notification.body).toEqual(expect.stringContaining('Admiral'))
  })

  messagingMock.mockClear()
  sendToDeviceMock.mockClear()

  await hourly_job(fakeEvent)

  expect(sendToDeviceMock.mock.calls).toHaveLength(0)

  admin.messaging = oldMessaging
})
