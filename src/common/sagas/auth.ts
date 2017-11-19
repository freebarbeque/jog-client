import {put, race, select, take} from 'redux-saga/effects';
import {push, LOCATION_CHANGE} from 'react-router-redux';
import {IUser, IUserCreds} from '../interfaces/user';
import {requestPasswordChange, resendEmail, signIn, signUp} from '../api/auth';
import {stopSubmit} from 'redux-form';
import {setUser, setIsLoading, setSessionToken} from '../actions/auth';
import {appAfterSignInFlow} from '../sagas/app';
import {SET_MOTOR_POLICIES} from '../constants/policies';

import {
    RESEND_EMAIL,
    SIGN_IN,
    SIGN_UP,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    REQUEST_PASSWORD_CHANGE,
    PASSWORD_RESET_FORM, LOG_OUT, SIGNED_IN,
} from '../constants/auth';

function* passwordResetFlow(email: string) {
    yield put(setIsLoading(true));
    yield requestPasswordChange(email);
    yield put(push('/auth/confirmForgotPassword'));
    yield put(setIsLoading(false));
}

function* signInFlow(creds: IUserCreds) {
    const {body, headers} = yield signIn(creds);
    yield put(setUser(body.user));
    yield put(setSessionToken(headers.get('Authorization')));
    yield appAfterSignInFlow();
    yield put(setIsLoading(false));
}

function* signUpFlow(user: IUser) {
    const createdUser = yield signUp(user);
    yield put(push('/auth/verify'));

    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));

    while (true) {
        const {resend} = yield race({
            resend: take(RESEND_EMAIL),
            locationChange: take(LOCATION_CHANGE),
        })

        if (resend) {
            yield put(setIsLoading(true));
            yield resendEmail(user.email);
            yield put(setIsLoading(false));
        } else {
            break;
        }
    }
}

export default function* authenticationFlow() {
    while (true) {
        const {signIn, signUp, passwordChange, signedIn} = yield race({
            signIn: take(SIGN_IN),
            signUp: take(SIGN_UP),
            passwordChange: take(REQUEST_PASSWORD_CHANGE),
            signedIn: take(SIGNED_IN),
        });

        yield put(setIsLoading(true));

        let form;
        try {
            if (signIn) {
                form = SIGN_IN_FORM;
                yield signInFlow(signIn.creds);
                break;
            } else if (signUp) {
                form = SIGN_UP_FORM;
                yield signUpFlow(signUp.user);

                const {payload: {pathname}} = yield take(LOCATION_CHANGE);

                if (pathname === '/auth') {
                    continue;
                } else {
                    break;
                }
            } else if (passwordChange) {
                form = PASSWORD_RESET_FORM;
                yield passwordResetFlow(passwordChange.email);
                continue;
            } else if (signedIn) {
                yield put(setIsLoading(false));
                break;
            }
        } catch (err) {
            yield put(stopSubmit(form, {_error: err.message}))
            yield put(setIsLoading(false));
        }
    }
}