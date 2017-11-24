import {get, post} from '../api/request';
import {put, select} from 'redux-saga/effects';
import {setDocuments} from '../actions/documents';
import {getSessionToken} from '../selectors/auth';
import {IPendingDocument} from '../interfaces/documents';

export function* fetchDocuments(userId: number, policyId: string) {
    const {body} = yield get(`users/${userId}/motor_policies/${policyId}/documents`);
    yield put(setDocuments(body.documents));
}

export function* uploadDocuments(userId: number, policyId: string, docs: IPendingDocument[]) {
    const sessionToken = yield select(getSessionToken);

    const headers = new Headers({
        'Authorization': sessionToken,
        'Accept': 'multipart/form-data',
    });

    yield docs.map(d => {
        const body = new FormData();
        body.append('data[type]', 'documents');
        body.append('data[attributes][attachment]', d.file);
        return post(`users/${userId}/motor_policies/${policyId}/documents`, body, headers, false);
    })
}
