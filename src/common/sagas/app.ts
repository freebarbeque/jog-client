import {put, select} from 'redux-saga/effects';
import {getUser} from '../selectors/auth';
import {getPolicies} from '../api/policies';
import {MOTOR_POLICY} from '../constants/policies';
import {setMotorPolicies} from '../actions/policies';
import {push} from 'react-router-redux';
import {signedIn} from '../actions/auth';

export function* appAfterSignInFlow () {
    const user = yield select(getUser);
    const {motor_policies} = yield getPolicies(MOTOR_POLICY, user.id);
    if (motor_policies) {
        yield put(setMotorPolicies(motor_policies));
    }

    yield put(signedIn());

    if (motor_policies.length) {
        yield put(push('/app/policies'));
    } else {
        yield put(push('/app/get_started'));
    }
}