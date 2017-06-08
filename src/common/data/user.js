// @flow

import firebase from 'firebase'
import type { UserDetails } from '../types'
import { demandCurrentUser } from './auth'

export async function getUserDetails(uid: string): Promise<UserDetails> {
  const snapshot = await firebase
    .database()
    .ref('users')
    .child(uid)
    .once('value')
  return snapshot.val() || {}
}

export function syncUserDetails(
  uid: string,
  cb: (details: UserDetails) => void,
) {
  const listener = snapshot => {
    const details = snapshot.val() || {}
    cb(details)
  }
  const ref = firebase.database().ref('users').child(uid)
  ref.on('value', listener)
  return () => ref.off('value', listener)
}

export async function updateUserDetails(
  uid: string,
  details: UserDetails,
): Promise<void> {
  const ref = firebase.database().ref('users').child(uid)
  await ref.update(details)
}

export function getCurrentUserDetails(): Promise<UserDetails> {
  const user = demandCurrentUser()
  const uid = user.uid
  return getUserDetails(uid)
}

export function syncCurrentUserDetails(cb: (details: UserDetails) => void) {
  const user = demandCurrentUser()
  const uid = user.uid
  syncUserDetails(uid, cb)
}

export async function updateCurrentUserDetails(
  details: UserDetails,
): Promise<void> {
  const user = demandCurrentUser()
  const uid = user.uid
  return updateUserDetails(uid, details)
}
