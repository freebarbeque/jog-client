import {put, race, select, take} from 'redux-saga/effects';
import {push, LOCATION_CHANGE} from 'react-router-redux';
import {IUser, IUserCreds} from '../interfaces/user';
import {resendEmail, signIn, signUp} from '../api/auth';
import {stopSubmit} from 'redux-form';
import {setUser, setIsLoading} from '../actions/auth';

import {
    RESEND_EMAIL,
    SIGN_IN,
    SIGN_UP,
    SIGN_IN_FORM,
    SIGN_UP_FORM,
} from '../constants/auth';

function* signInFlow(creds: IUserCreds) {
    const user = yield signIn(creds);
    yield put(setUser(user));
    yield put(push('/app/tabs/policies'));
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
        const {signIn, signUp} = yield race({
            signIn: take(SIGN_IN),
            signUp: take(SIGN_UP),
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
                break;
            }
        } catch (err) {
            yield put(stopSubmit(form, {_error: err.message}))
            yield put(setIsLoading(false));
        }
    }
}