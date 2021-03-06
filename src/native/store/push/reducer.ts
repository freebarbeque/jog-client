import { PushAction } from './actionTypes'

export interface IPushNotificationsReduxState {
  showModal: boolean
}

const DEFAULT_STATE = {
  showModal: false,
}

export default function reducer(
  state: IPushNotificationsReduxState = DEFAULT_STATE,
  action: PushAction,
) {
  if (action.type === 'push/SHOW_PUSH_NOTIFICATIONS_MODAL') {
    return {
      showModal: true,
    }
  } else if (action.type === 'push/HIDE_PUSH_NOTIFICATIONS_MODAL') {
    return {
      showModal: false,
    }
  }
  return state
}
