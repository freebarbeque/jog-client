import {put, race, select, take} from "redux-saga/effects";
import {getUser} from "~/common/selectors/auth";
import {push} from 'react-router-redux';
import {SIGN_IN, SIGN_UP} from "~/common/constants/auth";
import {IUser} from "~/common/interfaces/user";

function* signInFlow(user: IUser) {
    yield 1;
}

function* signUpFlow(user: IUser) {
    yield 1;
}

export default function* authenticationFlow () {
    const user = yield select(getUser);

    if (user) {
        //todo: push to /app
    } else {
        yield put(push('/auth'));

        const {signIn, signUp} = yield race({
            signIn: take(SIGN_IN),
            signUp: take(SIGN_UP),
        })

        if (signIn) {
            yield signInFlow(signIn.user);
        } else if (signUp) {
            yield signUpFlow(signUp.user);
        }
    }
}