import * as firebase from 'firebase'
import { goBack as back } from 'react-router-redux'
import { eventChannel } from 'redux-saga'

import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects'
import { sync } from '../data/quotes'
import { finishLoading, startLoading } from '../store/loading/actions'
import { Action } from '../types'

function constructEventChannel(key: string) {
  return eventChannel(emitter =>
    sync(key, response => {
      emitter(response)
    }),
  )
}

function constructSyncTask(
  key: string,
  receiveActionCreator: (items: any) => Action,
) {
  return function* task(action) {
    const channel = yield call(constructEventChannel, key)
    try {
      while (true) {
        const drivers = yield take(channel)
        yield put(receiveActionCreator(drivers))
      }
    } finally {
      if (yield cancelled()) {
        channel.close()
      }
    }
  }
}

export function constructAddTask(
  firebaseKey: string | ((action: any) => string),
  actionKey: string,
  goBack?: boolean | ((action: any) => boolean),
) {
  return function* generatedAddTask(action: any) {
    const generatedKey =
      typeof firebaseKey === 'string' ? firebaseKey : firebaseKey(action)
    yield call(() => {
      const value = action[actionKey]
      const db = firebase.database()
      const ref = db.ref(generatedKey)
      console.log('constructAddTask', generatedKey, value)
      return ref.set(value)
    })
    const shouldGoBack = typeof goBack === 'function' ? goBack(action) : goBack

    if (shouldGoBack) {
      yield put(back())
    }
  }
}

export interface IConstructSyncSagaOpts {
  syncActionType: string
  unsyncActionType: string
  receiveActionCreator: (items: any) => Action
  key: (() => string) | string
  user?: boolean
}

export function constructSyncSaga(opts: IConstructSyncSagaOpts) {
  return function* generatedSyncSaga() {
    let action: any

    // tslint:disable-next-line:no-conditional-assignment
    while ((action = yield take(opts.syncActionType))) {
      const task = constructSyncTask(
        typeof opts.key === 'string' ? opts.key : opts.key(),
        opts.receiveActionCreator,
      )

      // Start the sync in the background
      const bgTask = yield fork(task, action)

      // Wait for the sync to cancel
      yield take(opts.unsyncActionType)

      // The sync was cancelled - this causes the forked task to jump to finally block
      yield cancel(bgTask)
    }
  }
}
