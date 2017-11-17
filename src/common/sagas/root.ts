import {put, race, select, take} from 'redux-saga/effects';
import {getUser} from '../selectors/auth';
import {push} from 'react-router-redux';
import authenticationFlow from './auth';
import {LOG_OUT} from '../constants/auth';
import {setSessionToken, setUser} from '../actions/auth';
import { REHYDRATE } from 'redux-persist';

export default function* root () {
    yield take(REHYDRATE);

    while (true) {
        const user = yield select(getUser);
        const sessionToken = yield select(getSelection);

        if (user && sessionToken) {
            yield put(push('/app'));
        } else {
            yield put(push('/auth'));
            yield authenticationFlow();
        }

        yield take(LOG_OUT);
        yield put(setUser(null));
        yield put(setSessionToken(null));
    }
}