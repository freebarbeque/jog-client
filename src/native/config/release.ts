import { IEnvironmentConfig } from '~/common/types'

const messagingSenderId = '122459291249'
const storageBucket = 'jog-prod.appspot.com'
const databaseURL = 'https://jog-prod.firebaseio.com'
const apiKey = 'AIzaSyByoJ2eeu1gM3-Xn3guqPtocEAG2h3Q97w'

const config: IEnvironmentConfig = {
  isDebug: true,
  firebase: {
    apiKey,
    authDomain: 'jog-prod.firebaseapp.com',
    databaseURL,
    storageBucket,
    messagingSenderId,
  },
  firestack: {
    APIKey: apiKey,
    databaseURL,
    storageBucket,
    GCMSenderID: messagingSenderId,
    clientID:
      '122459291249-m1utl9kf630im11aeatmgf55usniersj.apps.googleusercontent.com',
    bundleID: 'insure.jog',
    debug: false,
    googleAppID: '1:122459291249:ios:2820eacc6be6be9a',
  },
}

export default config
