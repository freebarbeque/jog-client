import {put, race, select, take} from "redux-saga/effects";
import {push} from 'react-router-redux';
import {SIGN_IN, SIGN_UP} from "~/common/constants/auth";
import {IUser, IUserCreds} from "~/common/interfaces/user";

function* signInFlow(creds: IUserCreds) {
    yield console.log(creds);
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