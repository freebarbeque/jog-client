import {get} from '../api/request';
import {put} from 'redux-saga/effects';
import {setDocuments} from '../actions/documents';

export function* fetchDocuments(userId: number, policyId: string) {
    const {body} = yield get(`users/${userId}/motor_policies/${policyId}/documents`);
    yield put(setDocuments(body.documents));
}