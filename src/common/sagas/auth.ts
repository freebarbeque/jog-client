import {put, race, select, take} from 'redux-saga/effects';
import {push, LOCATION_CHANGE} from 'react-router-redux';
import {IUser, IUserCreds} from '../interfaces/user';
import {requestPasswordChange, resendEmail, signIn, signUp} from '../api/auth';
import {stopSubmit} from 'redux-form';
import {setUser, setIsLoading, setSessionToken, setAuthError} from '../actions/auth';
import {appAfterSignInFlow} from '../sagas/app';
import {getUser} from '../selectors/auth';
import {getQueryString} from '../selectors/request';
import {get} from '../api/request';

import {
    RESEND_EMAIL,
    SIGN_IN,
    SIGN_UP,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
    REQUEST_PASSWORD_CHANGE,
    PASSWORD_RESET_FORM, LOG_OUT, SIGNED_IN,
} from '../constants/auth';

export function* getUserWithAddress(userId: number | string) {
    const {body} = yield get(`users/${userId}?includes=addresses`);
    return body;
}

export function* emailVerifiedFlow() {
    const user = yield select(getUser);
    if (!user) {
        yield put(setAuthError(new Error('User not found')));
        return;
    }

    const query = yield select(getQueryString);
    const params = new URLSearchParams(query)
    const sessionToken = params.get('token');
    yield put(setSessionToken(`Bearer ${sessionToken}`));
    yield put(push('/'));
}

function* passwordResetFlow(email: string) {
    yield put(setIsLoading(true));
    yield requestPasswordChange(email);
    yield put(push('/auth/confirmForgotPassword'));
    yield put(setIsLoading(false));
}

function* signInFlow(creds: IUserCreds) {

    if (creds) {
        const {body, headers} = yield signIn(creds);
        yield put(setSessionToken(headers.get('Authorization')));
        const resp = yield getUserWithAddress(body.user.id); 
        yield put(setUser(resp.user));
        yield appAfterSignInFlow();
        yield put(setIsLoading(false));
    } else {
        throw new Error('Credentials are not provided');
    }
}

function* signUpFlow(user: IUser) {
    const body = yield signUp(user);
    yield put(setUser(body.user));
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