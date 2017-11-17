import {put, select} from 'redux-saga/effects';
import {getUser} from '../selectors/auth';
import {getPolicies} from '../api/policies';
import {MOTOR_POLICY} from '../constants/policies';
import {setMotorPolicies} from '../actions/policies';
import {push} from 'react-router-redux';

export function* appFlow () {
    const user = yield select(getUser);
    const {motor_policies} = yield getPolicies(MOTOR_POLICY, user.id);
    yield put(setMotorPolicies(motor_policies));

    if (motor_policies.length) {
        yield put(push('/app/policies'));
    } else {
        yield put(push('/app/get_started'));
    }
}