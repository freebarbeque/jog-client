/**
 * Notify the user that their policy will expire soon.
 * @param {string} policyId
 */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')

const data = require('./data')

const db = admin.database()
const messaging = admin.messaging()

export function constructExpiryNotificationBody(policy, days) {
  let body
  if (days === 0) {
    body = "Your motor policy will expire today"
  } else {
    body = "Your motor policy will expire in " + days.toString() + " day" + (days === 1 ? '' : 's')
  }
  return body
}

export function constructExpiredNotificationBody(policy, days) {
  let body
  if (days === 0) {
    body = "Your motor policy expire"
  } else {
    body = "Your motor policy expired " + days.toString() + " day" + (days === 1 ? '' : 's') + " ago."
  }
  return body
}

export function sendNotification(policy, title, body) {
  return data.fetchFCMToken(policy.uid).then(function (token) {
    if (token) {
      return messaging.sendToDevice(token, {
        notification: {
          title,
          body
        },
        data: {
          policy: policy.id
        }
      })
    } else {
      throw new Error('User with id ' + policy.uid + ' does not have an FCM token')
    }
  })
}

export function notifyExpiry (policy, days) {
  return sendNotification(
    policy,
    "Policy Expiry",
    constructExpiryNotificationBody(policy, days)
  )
}

export function notifyExpired (policy, days) {
  return sendNotification(
    policy,
    "Policy Expired",
    constructExpiredNotificationBody(policy, days)
  )
}
