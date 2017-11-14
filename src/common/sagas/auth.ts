import {put, race, select, take} from "redux-saga/effects";
import {push} from 'react-router-redux';
import {SIGN_IN, SIGN_UP} from "~/common/constants/auth";
import {IUser, IUserCreds} from "~/common/interfaces/user";
import {signIn, signUp} from '../api/auth';
import {stopSubmit} from 'redux-form';

function* signInFlow(creds: IUserCreds) {
    const user = yield signIn(creds);
    console.log(user);
}

function* signUpFlow(user: IUser) {
    const createdUser = yield signUp(user);
    console.log(createdUser);
}

export default function* authenticationFlow() {
    while (true) {
        const {signIn, signUp} = yield race({
            signIn: take(SIGN_IN),
            signUp: take(SIGN_UP),
        })

        let form;
        try {
            if (signIn) {
                form = 'signInForm';
                yield signInFlow(signIn.creds);
                break;
            } else if (signUp) {
                form = 'signUpForm';
                yield signUpFlow(signUp.user);
                break;
            }
        } catch(err) {
            yield put(stopSubmit(form, {_error: err.message}))
            console.log(err.message);
        }
    }
}