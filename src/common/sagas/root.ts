import {put, race, select, take} from "redux-saga/effects";
import {getUser} from "~/common/selectors/auth";
import {push} from 'react-router-redux';
import authenticationFlow from './auth';

export default function* root () {
    const user = yield select(getUser);

    if (user) {
        //todo: push to /app
    } else {
        yield put(push('/auth'));
        yield authenticationFlow();
    }
}