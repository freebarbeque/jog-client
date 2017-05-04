const apiKey = 'AIzaSyCQJfzrHhPIOKlqsiGJx-TuM2dvcluacYY'
const databaseURL = 'https://jog-dev.firebaseio.com'
const storageBucket = 'jog-dev.appspot.com'
const messagingSenderId = '766819384419'

export default {
  firebase: {
    apiKey,
    authDomain: 'jog-dev.firebaseapp.com',
    databaseURL,
    storageBucket,
    messagingSenderId,
  },
  firestack: {
    APIKey: apiKey,
    databaseURL,
    storageBucket,
    GCMSenderID: messagingSenderId,
    clientID: '766819384419-jvfmnmrifnpuce3t4gmut153ntqvo7ne.apps.googleusercontent.com',
    bundleID: 'insure.jog',
    debug: true,
    googleAppID: '1:766819384419:ios:2820eacc6be6be9a'
  },
  debug: true,
}
