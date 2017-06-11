// @flow

import firebase from 'firebase'
import { call, put, takeLatest } from 'redux-saga/effects'

import * as authApi from '../../../data/auth'

import {
  setLoading,
  setLoginError,
  setRegisterError,
  setPasswordResetError,
} from './actions'
import type {
  LoginAction,
  RegisterAction,
  PasswordResetAction,
} from './actions'
import { getNavigationAdapter } from '../../index'

function* login(action: LoginAction) {
  const { email, password } = action

  try {
    yield put(setLoading(true))
    yield put(setLoginError(null))
    yield call(authApi.signInWithEmailAndPassword, email, password)
    yield put(setLoading(false))
    const user = firebase.auth().currentUser
    if (user.emailVerified) {
      yield put(getNavigationAdapter().hideAuthModal())
    } else {
      user.sendEmailVerification()
      yield put(getNavigationAdapter().navigateToEmailVerification())
    }
  } catch (e) {
    yield put(setLoading(false))
    yield put(setLoginError(e.message))
  }
}

function* register(action: RegisterAction) {
  // key refers to the key of the route that we will gEo back from e.g. in this case, the AuthNavigator which is a modal
  const { email, password } = action
  try {
    yield put(setLoading(true))
    yield put(setRegisterError(null))
    yield call(authApi.createUserWithEmailAndPassword, email, password)
    yield put(setLoading(false))
    yield put(getNavigationAdapter().navigateToEmailVerification())
  } catch (e) {
    yield put(setLoading(false))
    yield put(setRegisterError(e.message))
  }
}

function* passwordReset(action: PasswordResetAction) {
  const { email } = action
  try {
    yield put(setLoading(true))
    yield put(setPasswordResetError(null))
    yield call(authApi.sendPasswordResetEmail, email)
    yield put(setLoading(false))
    yield put(getNavigationAdapter().navigateToConfirmPasswordReset())
  } catch (e) {
    yield put(setLoading(false))
    yield put(setPasswordResetError(e.message))
  }
}

function* verificationEmail() {
  try {
    const user = firebase.auth().currentUser
    yield put(setLoading(true))
    yield call(() => user.sendEmailVerification(user))
    yield put(setLoading(false))
  } catch (e) {
    console.error('Error sending verification email', e, e.stack)
    yield put(setLoading(false))
  }
}

function* authSaga<T>(): Iterable<T> {
  // takeLatest does not allow concurrent login requests - the opposite of takeEvery
  yield takeLatest('screens/auth/LOGIN', login)
  yield takeLatest('screens/auth/REGISTER', register)
  yield takeLatest('screens/auth/PASSWORD_RESET', passwordReset)
  yield takeLatest('screens/auth/SEND_VERIFICATION_EMAIL', verificationEmail)
}

export default authSaga