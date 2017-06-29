import { call, put, take, fork, cancelled, cancel } from 'redux-saga/effects'
import _ from 'lodash'

import { eventChannel } from 'redux-saga'
import $ from 'jquery'

import type { SubscribeDimensions } from './actionTypes'
import { updateDimensions } from './actions'

function createDimensionsChannel() {
  return eventChannel(emit => {
    const listener = _.debounce(() => {
      const $window = $(window)

      const dimensions = {
        width: $window.width(),
        height: $window.height(),
      }

      emit(dimensions)
    }, 50)

    listener()

    $(document).ready(() => {
      $(window).resize(listener)
    })

    return () => {
      $(window).off('listener')
    }
  })
}

export function* subscribeDimensions<T>(): Iterable<T> {
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

export function* dimensionsSubscriptionSaga<T>(): Iterable<T> {
  let action: ?SubscribeDimensions

  // eslint-disable-next-line no-cond-assign
  while ((action = yield take('dimensions/SUBSCRIBE_DIMENSIONS'))) {
    const bgTask = yield fork(subscribeDimensions, action)
    yield take('push/UNSUBSCRIBE_DIMENSIONS')
    yield cancel(bgTask)
  }
}
