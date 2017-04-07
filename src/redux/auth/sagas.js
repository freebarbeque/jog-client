// @flow

import firebase from 'firebase'

import {
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
} from 'redux-saga/effects'

import { eventChannel } from 'redux-saga'
import type { FirebaseUser } from 'jog/src/types'
import createThrottle from 'async-throttle'

import { receiveUser } from './actions'

const throttle = createThrottle(1)

// Creates an event channel that polls & throttles firebase.User.reload
function userChannel(ms: number = 1000) {
  return eventChannel(
    (emit) => {
      const interval = setInterval(
        () => (
          throttle(
            async () => {
              const user = firebase.auth().currentUser
              await user.reload()
              emit(user.toJSON())
            }
          )
      ), ms)

      return () => { clearInterval(interval) }
    }
  )
}

function* reloadUserTask() {
  const channel = yield call(userChannel)

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const user: FirebaseUser = yield take(channel)
      yield put(receiveUser(user))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

/**
 * Unfortunately, firebase.auth().onAuthStateChanged only fires when the user changes but not when
 * user properties change.
 *
 * For the above reason we must call .reload on the user to refresh the properties.
 * This is used when waiting for email verification before hiding the auth modal.
 */
function* pollSaga<T>(): Iterable<T> {
  while (yield take('auth/POLL_REFRESH_USER')) {
    const bgTask = yield fork(reloadUserTask)
    yield take('auth/STOP_POLL_REFRESH_USER')
    yield cancel(bgTask)
  }
}

export default pollSaga
