import {take} from 'redux-saga/effects';
import {CREATE_POLICY} from '~/common/constants/policies';

export function* createPolicyFlow() {
    const {values} = yield take(CREATE_POLICY);
    console.log(values);
}