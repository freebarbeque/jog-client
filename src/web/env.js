const environments = {
  DEBUG: {
    firebase: {
      apiKey: 'AIzaSyCiGNJ7RbnRaYpyK05rOnqMyt0xmVCe920',
      authDomain: 'jog-dev-10fe9.firebaseapp.com',
      databaseURL: 'https://jog-dev-10fe9.firebaseio.com',
      storageBucket: 'jog-dev-10fe9.appspot.com',
      messagingSenderId: '98399119405',
    },
  },
  RELEASE: {
    firebase: {
      apiKey: 'AIzaSyByoJ2eeu1gM3-Xn3guqPtocEAG2h3Q97w',
      authDomain: 'jog-prod.firebaseapp.com',
      databaseURL: 'https://jog-prod.firebaseio.com',
      storageBucket: 'jog-prod.appspot.com',
      messagingSenderId: '122459291249',
    },
  },
}

console.log('process.env', process.env)

const JOG_ENVIRONMENT = process.env.JOG_ENVIRONMENT

if (!JOG_ENVIRONMENT) throw new Error('JOG_ENVIRONMENT is not defined')

const env = environments[JOG_ENVIRONMENT]

if (!env)
  throw new Error(
    `No environment definition for JOG_ENVIRONMENT=${JOG_ENVIRONMENT}`,
  )

console.log(`JOG_ENVIRONMENT=${JOG_ENVIRONMENT}`, env)

export default env
