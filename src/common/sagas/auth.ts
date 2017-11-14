import {put, race, select, take} from "redux-saga/effects";
import {push} from 'react-router-redux';
import {SIGN_IN, SIGN_UP} from "~/common/constants/auth";
import {IUser, IUserCreds} from "~/common/interfaces/user";
import {signIn} from '../api/auth';

function* signInFlow(creds: IUserCreds) {
    const user = yield signIn(creds);
    console.log(user);
}

function* signUpFlow(user: IUser) {
    yield console.log(user);
}

export default function* authenticationFlow() {
    const {signIn, signUp} = yield race({
        signIn: take(SIGN_IN),
        signUp: take(SIGN_UP),
    })

    if (signIn) {
        yield signInFlow(signIn.creds);
    } else if (signUp) {
        yield signUpFlow(signUp.user);
    }
}