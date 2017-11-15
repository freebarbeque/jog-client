import {put, race, select, take} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {SIGN_IN, SIGN_UP} from '../constants/auth';
import {IUser, IUserCreds} from '../interfaces/user';
import {signIn, signUp} from '../api/auth';
import {stopSubmit} from 'redux-form';
import {setUser, setIsLoading} from '../actions/auth';

function* signInFlow(creds: IUserCreds) {
    const user = yield signIn(creds);
    yield put(setUser(user));
    yield put(push('/app/tabs/policies'));
}

function* signUpFlow(user: IUser) {
    const createdUser = yield signUp(user);
    yield put(push('/auth/verify'));
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
                form = 'signInForm';
                yield signInFlow(signIn.creds);
                yield put(setIsLoading(false));
                break;
            } else if (signUp) {
                form = 'signUpForm';
                yield signUpFlow(signUp.user);
                yield put(setIsLoading(false));
                break;
            }
        } catch (err) {
            yield put(stopSubmit(form, {_error: err.message}))
            yield put(setIsLoading(false));
        }
    }
}