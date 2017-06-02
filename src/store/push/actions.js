// @flow

import type {
  SubscribePushNotificationsAction,
  UnsubscribePushNotificationsAction,
  EnablePushNotifications,
  DisablePushNotifications,
  ShowPushNotificationsModal,
  HidePushNotificationsModal,
  ReceivePushNotification,
} from './actionTypes'

export function subscribePushNotifications(): SubscribePushNotificationsAction {
  return {
    type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS',
  }
}

export function unsubscribePushNotifications(): UnsubscribePushNotificationsAction {
  return {
    type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS',
  }
}

export function enablePushNotifications(): EnablePushNotifications {
  return {
    type: 'push/ENABLE_PUSH_NOTIFICATIONS',
  }
}

export function disablePushNotifications(): DisablePushNotifications {
  return {
    type: 'push/DISABLE_PUSH_NOTIFICATIONS',
  }
}

export function showPushNotificationsModal(): ShowPushNotificationsModal {
  return {
    type: 'push/SHOW_PUSH_NOTIFICATIONS_MODAL',
  }
}

export function hidePushNotificationsModal(): HidePushNotificationsModal {
  return {
    type: 'push/HIDE_PUSH_NOTIFICATIONS_MODAL',
  }
}

export function receivePushNotification(
  notification: Object,
): ReceivePushNotification {
  return {
    type: 'push/RECEIVE_PUSH_NOTIFICATION',
    notification,
  }
}
