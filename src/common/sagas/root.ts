import {put, race, select, take} from 'redux-saga/effects';
import {getUser} from '../selectors/auth';
import {push} from 'react-router-redux';
import authenticationFlow from './auth';
import {LOG_OUT} from '../constants/auth';
import {setUser} from '../actions/auth';

export default function* root () {
    while (true) {
        const user = yield select(getUser);

        if (user) {
            yield put(push('/app/tabs/policies'));
        } else {
            yield put(push('/auth'));
            yield authenticationFlow();
        }

        yield take(LOG_OUT);
        yield put(setUser(null));
    }
}