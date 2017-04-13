// @flow

import firebase from 'firebase'
import type { FirebaseUser } from 'jog/src/types'

const errors = {
  'auth/invalid-email': 'Invalid email address supplied.',
  'auth/wrong-password': 'Please check your password and try again.',
  'auth/expired-action-code': 'That code has expired. Please try again.',
  'auth/invalid-action-code': 'That code is either invalid or has already been used.',
  'auth/user-disabled': 'This user account has been disabled.',
  'auth/user-not-found': 'A user with that email does not exist.',
  'auth/weak-password': 'Your password is too weak.',
  'auth/email-already-in-use': 'An account with that email address already exists.',
  'auth/operation-not-allowed': 'Email/password authentication is currently disabled.',
}

// Decorates firebase calls converting errors into user readable errors and warning when this
// is impossible.
function errorWrapper(fn: Function): ((...args: *) => Promise<*>) {
  return async function decoratedFirebaseCall(...args: any[]) {
    try {
      await fn(...args)
    } catch (err) {
      if (err.code) { // Is this a firebase error?
        const errorMessage = errors[err.code]
        if (errorMessage) {
          err.message = errorMessage
          throw err
        } else {
          console.warn(`Unknown firebase error "${err.code}": ${err.message}`)
          err.message = 'Unknown server error. Please try again later.'
          throw err
        }
      } else {
        throw err
      }
    }
  }
}

export const signInAnonymously: () => Promise<void>
  = errorWrapper(() => firebase.auth().signInAnonymously())

export const createUserWithEmailAndPassword: (string, string) => Promise<void>
  = errorWrapper(async (email: string, password: string) => {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
    await user.sendEmailVerification()
  })

export const signInWithEmailAndPassword: (string, string) => Promise<void>
  = errorWrapper((email, password) => firebase.auth().signInWithEmailAndPassword(email, password))

export const signOut: () => Promise<void>
  = errorWrapper(() => firebase.auth().signOut())

export const sendPasswordResetEmail: (email: string) => Promise<void>
  = errorWrapper((email: string) => firebase.auth().sendPasswordResetEmail(email))

export const confirmPasswordReset : (code: string, password: string) => Promise<void>
  = errorWrapper((code: string, password: string) => firebase.auth().confirmPasswordReset(code, password))

export function userSubscribe(callback: (user: FirebaseUser | null) => void): () => void {
  return firebase.auth().onAuthStateChanged((u) => callback(u ? u.toJSON() : null))
}

