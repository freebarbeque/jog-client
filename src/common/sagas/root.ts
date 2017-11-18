import {all, put, race, select, take} from 'redux-saga/effects';
import {getSessionToken, getUser} from '../selectors/auth';
import {push} from 'react-router-redux';
import {LOG_OUT} from '../constants/auth';
import {setSessionToken, setUser} from '../actions/auth';
import { REHYDRATE } from 'redux-persist';
import {IAction} from '../interfaces/action';
import {isSecureRoute} from '~/common/utils/route';
import {takeEvery} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';

function* handleRoute({payload: {pathname}}: IAction) {
    const sessionToken = yield select(getSessionToken);
    const isSecure = isSecureRoute(pathname);
    console.log(pathname, isSecure, !!sessionToken);
    if (isSecure && !sessionToken) {
        yield put(push('/auth'));
    } else if (!isSecure && sessionToken) {
        yield put(push('/app'));
    }
}

function* handleLogout() {
    yield put(setUser(null));
    yield put(setSessionToken(null));
}

export default function* () {
    yield all([
        takeEvery(LOCATION_CHANGE, handleRoute),
        takeEvery(LOG_OUT, handleLogout),
    ])
}