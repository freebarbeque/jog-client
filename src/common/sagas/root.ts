import {all, put, race, select, take, fork} from 'redux-saga/effects';
import {getSessionToken, getUser} from '../selectors/auth';
import {push} from 'react-router-redux';
import {LOG_OUT} from '../constants/auth';
import {setSessionToken, setUser} from '../actions/auth';
import { REHYDRATE } from 'redux-persist';
import {IAction} from '../interfaces/action';
import {isSecureRoute} from '../utils/route';
import {takeEvery} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import {appAfterSignInFlow} from '../sagas/app';
import {getInsuranceCompanies} from '../api/policies';
import {setDataSource} from '../actions/dataSource';

function* handleRoute({payload: {pathname}}: IAction) {
    const sessionToken = yield select(getSessionToken);
    const isSecure = isSecureRoute(pathname);

    if (isSecure && !sessionToken) {
        yield put(push('/auth'));
    } else if (!isSecure && sessionToken) {
        yield appAfterSignInFlow();
    } else if (pathname === '/' && !sessionToken) {
        yield put(push('/auth'));
    }
}

function* handleLogout() {
    yield put(setUser(null));
    yield put(setSessionToken(null));
    yield put(push('/auth'));
}

function* fetchInsuranceCompanies() {
    const {insurance_companies} = yield getInsuranceCompanies();
    yield put(setDataSource('insuranceCompanies', insurance_companies.map(ic => ({id: ic.id, name: ic.name}))));
}

export default function* () {
    yield fork(fetchInsuranceCompanies);
    yield all([
        takeEvery(LOCATION_CHANGE, handleRoute),
        takeEvery(LOG_OUT, handleLogout),
    ])
}