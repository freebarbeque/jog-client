// @flow

import type {
  SubscribePushNotificationsAction,
  UnsubscribePushNotificationsAction,
  EnablePushNotifications,
  DisablePushNotifications,
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
