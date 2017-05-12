// @flow

import firebase from 'firebase'
import type { UserDetails } from '../types'
import { demandCurrentUser } from './auth'

export async function getUserDetails() : Promise<UserDetails> {
  const user = demandCurrentUser()
  const snapshot = await firebase.database().ref('users').child(user.uid).once('value')
  return snapshot.val() || {}
}

export function syncUserDetails(cb: (details: UserDetails) => void) {
  const user = demandCurrentUser()
  const listener = (snapshot) => {
    const details = snapshot.val() || {}
    cb(details)
  }
  const ref = firebase.database().ref('users').child(user.uid)
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export async function updateUserDetails(details: UserDetails) : Promise<void> {
  const user = demandCurrentUser()
  const ref = firebase.database().ref('users').child(user.uid)
  await ref.update(details)
}
