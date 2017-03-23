// @flow

import firebase from 'firebase'

export default function initialiseFirebase() {
  const config = {
    apiKey: 'AIzaSyCa5Uyt5P1M9202SeF3qBt3xNCus7zonqE',
    authDomain: 'abc123-10cde.firebaseapp.com',
    databaseURL: 'https://abc123-10cde.firebaseio.com',
    storageBucket: 'abc123-10cde.appspot.com',
    messagingSenderId: '714554132264',
  }

  firebase.initializeApp(config)
}
