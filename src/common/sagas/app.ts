import {put, select} from "redux-saga/effects";
import {getUser} from "~/common/selectors/auth";
import {getPolicies} from "~/common/api/policies";
import {MOTOR_POLICY} from '../constants/policies';
import {setMotorPolicies} from "~/common/actions/policies";
import {push} from 'react-router-redux';

export default function* appFlow () {
    const user = yield select(getUser);
    const {motor_policies} = yield getPolicies(MOTOR_POLICY, user.id);
    yield put(setMotorPolicies(motor_policies));

    if (motor_policies.length) {
        yield put(push('/app/policies'));
    } else {
        yield put(push('/app/get_started'));
    }
}