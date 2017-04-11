// @flow

import {
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
} from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'

import { syncMotorPolicies } from 'jog/src/data/policies'

import { receiveMotorPolicies } from './actions'
import type { SyncMotorPoliciesAction } from './actionTypes'

function policyEventChannel(uid: string) {
  return eventChannel((emitter) =>
    syncMotorPolicies(
      uid,
      (policies) => {
        console.log('emitter', emitter)
        emitter(policies)
      }
    )
  )
}

function* syncMotorPoliciesTask({ uid }) {
  const channel = yield call(
    policyEventChannel,
    uid
  )
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const policies = yield take(channel)
      console.debug(`syncMotorPolicies{${uid}}:`, policies)
      yield put(receiveMotorPolicies(policies))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncPoliciesSaga<T>() : Iterable<T> {
  let action: ?SyncMotorPoliciesAction

  // eslint-disable-next-line no-cond-assign
  while (action = yield take('policies/SYNC_MOTOR_POLICIES')) {
    // Start the sync in the background
    const bgTask = yield fork(syncMotorPoliciesTask, action)

    // Wait for the sync to cancel
    yield take('policies/UNSYNC_MOTOR_POLICIES')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}
