import {
  IDisablePushNotifications,
  IEnablePushNotifications,
  IHidePushNotificationsModal,
  IReceivePushNotification,
  IShowPushNotificationsModal,
  ISubscribePushNotificationsAction,
  IUnsubscribePushNotificationsAction,
} from './actionTypes'

export function subscribePushNotifications(): ISubscribePushNotificationsAction {
  return {
    type: 'push/SUBSCRIBE_PUSH_NOTIFICATIONS',
  }
}

export function unsubscribePushNotifications(): IUnsubscribePushNotificationsAction {
  return {
    type: 'push/UNSUBSCRIBE_PUSH_NOTIFICATIONS',
  }
}

export function enablePushNotifications(): IEnablePushNotifications {
  return {
    type: 'push/ENABLE_PUSH_NOTIFICATIONS',
  }
}

export function disablePushNotifications(): IDisablePushNotifications {
  return {
    type: 'push/DISABLE_PUSH_NOTIFICATIONS',
  }
}

export function showPushNotificationsModal(): IShowPushNotificationsModal {
  return {
    type: 'push/SHOW_PUSH_NOTIFICATIONS_MODAL',
  }
}

export function hidePushNotificationsModal(): IHidePushNotificationsModal {
  return {
    type: 'push/HIDE_PUSH_NOTIFICATIONS_MODAL',
  }
}

export function receivePushNotification(
  notification: any,
): IReceivePushNotification {
  return {
    type: 'push/RECEIVE_PUSH_NOTIFICATION',
    notification,
  }
}
