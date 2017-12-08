const {cancel, fork, put, race, select, take, takeEvery} = require('redux-saga/effects');
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {setIsLoading, storeDriverLocally} from '../../actions/userDetails';
import {CHANGE_SELECTED_DRIVER, DRIVER_DETAILS_FORM, SUBMIT_DRIVER} from '../../constants/userDetails';
import {mapDriverDetailsFormValues, mapDriverToFormValues} from '../../utils/userDetails';
import {initialize} from 'redux-form';
import {IAction} from '../../interfaces/action';
import {getAvailableDriver} from '../../selectors/userDetils';
import {delay} from 'redux-saga';

const initialValues = {
    driver_selected: null,
    title: 'mr',
    gender: 'male',
    insurance_refused: false,
    license_state: 'full',
    smoker: false,
    relationship_status: 'single',
    born_in_uk: true,
    incident_code: null,
    fault: false,
    personal_injury: false,
    current_policy: true,
    conviction_code: null,
    conviction: [{}],
    incident: [{fault: false, personal_injury: false, current_policy: false}],
    incidents_claims: false,
    motoring_convictions: false,
};

function* watchSelectedDriverChange({driverId}: IAction) {
    const driver = yield select(getAvailableDriver(driverId));
    if (driver) {
        yield put(initialize(DRIVER_DETAILS_FORM, mapDriverToFormValues(driver, driverId)));
    } else {
        yield put(initialize('driversAdd', initialValues));
    }
}

function* driverWorker(policyId: string) {
    yield fork(takeEvery, CHANGE_SELECTED_DRIVER, watchSelectedDriverChange);

    const {driver} = yield take(SUBMIT_DRIVER);
    yield put(setIsLoading(true));
    yield delay(1000);
    yield put(storeDriverLocally(policyId, mapDriverDetailsFormValues(driver)));
    yield put(push(`/app/user/motor/${policyId}/address`))
    yield put(setIsLoading(false));
}

export function* driverFlow(policyId: string) {
    const worker = yield fork(driverWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield cancel(worker);
}