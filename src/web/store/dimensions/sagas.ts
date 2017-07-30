import { call, put, take, fork, cancelled, cancel } from 'redux-saga/effects'

import * as $ from 'jquery'

import { SubscribeDimensions } from './actionTypes'
import { updateDimensions } from './actions'
import { eventChannel } from 'redux-saga'

function createDimensionsChannel() {
  return eventChannel(emit => {
    let resizeTimer

    $(document).ready(() => {
      $(window).on('resize', () => {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(() => {
          emit({ width: $(window).width(), height: $(window).height() })
          // Run code here, resizing has "stopped"
        }, 100)
      })
    })

    return () => {
      $(window).off('listener')
    }
  })
}

export function* subscribeDimensions() {
  const channel = yield call(createDimensionsChannel)

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { width, height } = yield take(channel)
      yield put(updateDimensions(width, height))
    }
  } finally {
    if (yield cancelled()) {
      if (channel) {
        channel.close()
      }
    }
  }
}

export function* dimensionsSubscriptionSaga() {
  let action: SubscribeDimensions

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('dimensions/SUBSCRIBE_DIMENSIONS'))) {
    const bgTask = yield fork(subscribeDimensions, action)
    yield take('push/UNSUBSCRIBE_DIMENSIONS')
    yield cancel(bgTask)
  }
}
