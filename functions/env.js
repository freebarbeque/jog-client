const environment = process.env.JOG_ENVIRONMENT || 'DEBUG'

let config

if (environment === 'DEBUG') {
  config = {
    serviceAccount: require('./service-account-dev.json'),
    databaseURL: 'https://jog-dev-10fe9.firebaseio.com'
  }
} else if (environment === 'TEST') {
  config = {
    serviceAccount: require('./service-account-test.json'),
    databaseURL: 'https://jog-ci.firebaseio.com'
  }
} else if (environment === 'RELEASE') {
  config = {
    serviceAccount: require('./service-account-prod.json'),
    databaseURL: 'https://jog-prod.firebaseio.com'
  }
} else {
  throw new Error(`No environment config found for environment: ${environment}`)
}

module.exports = config

