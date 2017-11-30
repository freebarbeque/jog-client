import {put, race, select, take, fork, cancel} from 'redux-saga/effects';
import {getDrivers} from '../api/drivers';
import {getUser} from '../selectors/auth';
import {setDrivers, setLoading} from '../actions/drivers';

export function* fetchDriversWorker() {
  yield put(setLoading(true));
  const user = yield select(getUser);
  const {drivers} = yield getDrivers(user.id);

  yield put(setDrivers(drivers));

  yield put(setLoading(false));
}