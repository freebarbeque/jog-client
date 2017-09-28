import { IEnvironmentConfig } from '~/common/types'

const apiKey = 'AIzaSyCiGNJ7RbnRaYpyK05rOnqMyt0xmVCe920'
const databaseURL = 'https://jog-dev-10fe9.firebaseio.com'
const storageBucket = 'jog-dev-10fe9.appspot.com'
const messagingSenderId = '98399119405'

const config: IEnvironmentConfig = {
  isDebug: true,
  firebase: {
    apiKey,
    authDomain: 'jog-dev-10fe9.firebaseapp.com',
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
      '766819384419-jvfmnmrifnpuce3t4gmut153ntqvo7ne.apps.googleusercontent.com',
    bundleID: 'insure.jog',
    debug: true,
    googleAppID: '1:766819384419:ios:2820eacc6be6be9a',
  },
}

export default config
