const admin = require('firebase-admin')
const config = require('../src/config')
const _ = require('lodash')
const moment = require('moment')

admin.initializeApp({
  credential: admin.credential.cert(config.serviceAccount),
  databaseURL: config.firebase.databaseURL
});

export function markExpiryNotificationSent(policyId, days) {
  return new Promise(function (resolve, reject) {
    const ref = admin.database().ref('policies').child(policyId).child('notifications').child('expiry')
    ref.set(days).then(() => resolve()).catch(reject)
  })
}

export function markExpiredNotificationSent(policyId, days) {
  return new Promise(function (resolve, reject) {
    const ref = admin.database().ref('policies').child(policyId).child('notifications').child('expired')
    ref.set(days).then(() => resolve()).catch(reject)
  })
}

export function fetchPolicy(policyId) {
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
export function fetchExpiringPolicies() {
  return new Promise(function (resolve, reject) {
    const startDate = moment().toDate().getTime()
    const endDate = moment().add(30, 'days').toDate().getTime()
    const ref = admin.database().ref('policies').orderByChild('expiryDate').startAt(startDate).endAt(endDate)
    ref.once('value', snapshot => {
      const policies = _.values(snapshot.val())
      resolve(policies)
    })
  })
}

export function fetchExpiredPolicies() {
  return new Promise(function (resolve, reject) {
    const endDate = moment().subtract(1, 'days').toDate().getTime()
    const ref = admin.database().ref('policies').orderByChild('expiryDate').endAt(endDate)
    ref.once('value', snapshot => {
      const policies = _.values(snapshot.val())
      resolve(policies)
    })
  })
}

export function setPolicies(policies) {
  return admin.database().ref('policies').set(policies)
}
