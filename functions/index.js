const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')
const _ = require('lodash')

const data= require('./data')

exports.hourly_job = functions.pubsub.topic('hourly-tick').onPublish(
  function () {
    data.fetchExpiredPolicies().then(function (policies) {
      policies.map(function (p) {
        const days = moment().diff(moment(p.expiryDate), 'days')

      })
    })
    data.fetchExpiringPolicies().then(function (policies) {

    })
  }
);
