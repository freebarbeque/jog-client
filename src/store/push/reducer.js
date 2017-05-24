// @flow

import type { PushAction } from './actionTypes'

export type PushNotificationsReduxState = {
  showModal: boolean,
}

const DEFAULT_STATE = {
  showModal: false
}

export default function reducer(
  state: PushNotificationsReduxState = DEFAULT_STATE,
  action: PushAction,
) {
  if (action.type === 'push/SHOW_PUSH_NOTIFICATIONS_MODAL') {
    return {
      showModal: true
    }
  } else if (action.type === 'push/HIDE_PUSH_NOTIFICATIONS_MODAL') {
    return {
      showModal: false
    }
  }
  return state
}
