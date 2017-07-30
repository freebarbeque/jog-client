import { call, put, take, fork, cancelled, cancel } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

import { syncInsurers } from '../../data/insurers'
import { receiveInsurers } from './actions'
import { SyncInsurers } from './actionTypes'

function policyEventChannel() {
  return eventChannel(emitter =>
    syncInsurers(insurers => {
      console.log('emitter', emitter)
      emitter(insurers)
    }),
  )
}

function* syncInsurersTask() {
  const channel = yield call(policyEventChannel)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const policies = yield take(channel)
      yield put(receiveInsurers(policies))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export function* syncInsurersSaga() {
  let action: SyncInsurers

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('insurers/SYNC_INSURERS'))) {
    // Start the sync in the background
    const bgTask = yield fork(syncInsurersTask, action)

    // Wait for the sync to cancel
    yield take('insurers/UNSYNC_INSURERS')

    // The sync was cancelled - this causes the forked task to jump to finally block
    yield cancel(bgTask)
  }
}
