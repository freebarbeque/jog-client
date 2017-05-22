const admin = require('firebase-admin')
const _ = require('lodash')
const moment = require('moment')
const config = require('./env')

admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.databaseURL
});

function markExpiryNotificationSent (policyId, days) {
  return new Promise(function (resolve, reject) {
    const ref = admin.database().ref('policies').child(policyId).child('notifications').child('expiry')
    ref.set(days).then(() => resolve()).catch(reject)
  })
}

function markExpiredNotificationSent (policyId, days) {
  return new Promise(function (resolve, reject) {
    const ref = admin.database().ref('policies').child(policyId).child('notifications').child('expired')
    ref.set(days).then(() => resolve()).catch(reject)
  })
}

function fetchPolicy (policyId) {
  return new Promise(function (resolve, reject) {
    admin.database().ref('policies').child(policyId).once('value', function (snapshot) {
      const policy = snapshot.val()
      resolve(policy)
    })
  })
}

/**
 * Selects all policies that will expiry within the next 30 days
 * @returns {Promise}
 */
function fetchExpiringPolicies () {
  return new Promise(function (resolve, reject) {
    const startDate = moment().toDate().getTime()
    const endDate = moment().add(31, 'days').toDate().getTime()
    const ref = admin.database().ref('policies').orderByChild('expiryDate').startAt(startDate).endAt(endDate)
    ref.once('value', snapshot => {
      const policies = _.map(snapshot.val(), (value, key) => {
        value.id = key
        return value
      })
      resolve(policies)
    })
  })
}

function fetchExpiredPolicies () {
  return new Promise(function (resolve, reject) {
    const endDate = moment().subtract(1, 'days').toDate().getTime()
    const ref = admin.database().ref('policies').orderByChild('expiryDate').endAt(endDate)
    ref.once('value', snapshot => {
      const policies = _.map(snapshot.val(), (value, key) => {
        value.id = key
        return value
      })
      resolve(policies)
    })
  })
}

/**
 * Filter out policies that are not expiring soon or have already been notified.
 *
 * Policies that will be notified:
 *  - Expiring in 10, 20 or 30 days
 *  - Expiring in 1 - 5 days
 *
 * @param policies
 * @returns {*}
 */
function filterExpiringPolicies (policies) {
  const keyPath = 'notifications.expiry'
  return policies.filter(function (policy) {
    const notifiedExpired = _.get(policy, keyPath)
    const days = moment(policy.expiryDate).diff(moment(), 'days')
    return (notifiedExpired === null || notifiedExpired === undefined || days > notifiedExpired) &&
           ((days >= 0 && days <= 5) || (days % 10 === 0))
  })
}

/**
 * Filter out policies that are not expiring soon or have already been notified.
 *
 * Policies that will be notified:
 *  - Expired 0 - 5 days ago
 *  - Expired 10, 20 or 30 days ago
 *
 * @param policies
 * @returns {*}
 */
function filterExpiredPolicies (policies) {
  const keyPath = 'notifications.expired'
  return policies.filter(function (policy) {
    const notifiedExpired = _.get(policy, keyPath)
    const days = moment().diff(moment(policy.expiryDate), 'days')
    return (notifiedExpired === null || notifiedExpired === undefined || days > notifiedExpired) &&
           ((days >= 0 && days <= 5) || (days % 10 === 0))
  })
}

function fetchFCMToken (uid) {
  return new Promise(function (resolve, reject) {
    admin.database().ref(`users/${uid}`).once('value', function (snapshot) {
      const user = snapshot.val()
      if (user) {
        const token = user.fcmToken
        resolve(token)
      } else {
        reject(new Error("No such user with id " + uid))
      }
    })
  })
}

function setPolicies (policies) {
  return admin.database().ref('policies').set(policies)
}

function setUser(uid, user) {
  return admin.database().ref('users').child(uid).set(user)
}

module.exports = {
  setPolicies,
  setUser,
  fetchFCMToken,
  filterExpiredPolicies,
  filterExpiringPolicies,
  fetchExpiredPolicies,
  fetchExpiringPolicies,
  fetchPolicy,
  markExpiredNotificationSent,
  markExpiryNotificationSent,
}
