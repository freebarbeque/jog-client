// @flow

import firebase from 'firebase'
import {
  call,
  put,
  take,
  fork,
  cancelled,
  cancel,
  takeLatest
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import createThrottle from 'async-throttle'
import { NavigationActions } from 'react-navigation'

import { signOut, userSubscribe } from 'jog/src/data/auth'

import { setLoading } from '../screens/auth/actions'

import { receiveUser, receiveUserDetails } from './actions'
import type { SyncUserAction } from './actionTypes'
import { syncUserData, unsyncUserData } from '../actions'
import { syncUserDetails } from '../../data/user'

const throttle = createThrottle(1)

// Creates an event channel that polls & throttles firebase.User.reload
function createUserPollChannel(ms: number = 1000) {
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

function createUserSubscribeChannel() {
  return eventChannel((emit) => {
    let user = null
    let details = null
    let unsubscribeDetails = null

    const unsubscribeUser = userSubscribe(
      (newUser) => {
        const uid = user && user.uid
        const newUid = newUser && newUser.uid

        if (uid !== newUid) {
          if (unsubscribeDetails) unsubscribeDetails()
          if (newUid) {
            unsubscribeDetails = syncUserDetails(newUid, (newDetails) => {
              details = newDetails
              emit({ user, details })
            })
          }
        }

        user = newUser
        emit({ user, details })
      }
    )

    return () => {
      unsubscribeUser()
      if (unsubscribeDetails) unsubscribeDetails()
    }
  })
}

function* reloadUserTask() {
  const channel = yield call(createUserPollChannel)

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const user = yield take(channel)
      yield put(receiveUser(user))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* syncUserTask() {
  const channel = yield call(createUserSubscribeChannel)
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { user, details } = yield take(channel)
      yield put(receiveUser(user))
      yield put(receiveUserDetails(details))
      if (user) { yield put(syncUserData(user.uid)) }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* logout() {
  const user = firebase.auth().currentUser
  if (user) {
    yield put(setLoading(true))
    yield call(signOut)
    yield put(unsyncUserData(user.uid))
    yield put(setLoading(false))
  } else {
    console.warn(
      'Attempted to logout when no user was logged in. This indicates that the user was able to access the Sign Out button without being logged in.'
    )
  }
  yield put(NavigationActions.navigate({ routeName: 'Auth' }))
}

/**
 * Unfortunately, firebase.auth().onAuthStateChanged only fires when the user changes but not when
 * user properties change.
 *
 * For the above reason we must call .reload on the user to refresh the properties.
 * This is used when waiting for email verification before hiding the auth modal.
 */
export function* pollUserSaga<T>(): Iterable<T> {
  while (yield take('auth/POLL_REFRESH_USER')) {
    const bgTask = yield fork(reloadUserTask)
    yield take('auth/STOP_POLL_REFRESH_USER')
    yield cancel(bgTask)
  }
}

export function* authSaga<T>(): Iterable<T> {
  yield takeLatest('auth/LOGOUT', logout)
}

export function* userSyncSaga<T>(): Iterable<T> {
  let action: ?SyncUserAction

  // eslint-disable-next-line no-cond-assign
  while (action = yield take('auth/SYNC_USER')) {
    yield fork(syncUserTask, action)
  }
}
