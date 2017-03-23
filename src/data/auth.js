// @flow

import firebase from 'firebase'
import type { User } from './typedefs'

export async function anonymousLogin(): Promise<void> {
  await firebase.auth().signInAnonymously()
}

export async function signUp(email: string, password: string): Promise<void> {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
}

export async function login(email: string, password: string): Promise<void> {
  await firebase.auth().signInWithEmailAndPassword(email, password)
}

export async function logout(): Promise<void> {
  await firebase.auth().signOut()
}

export function userSubscribe(callback: (user: User | null) => void): void {
  firebase.auth().onAuthStateChanged(callback)
}

