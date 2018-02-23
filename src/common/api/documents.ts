import {get, post, remove} from '../api/request';
import {put, select} from 'redux-saga/effects';
import {removeDocumentLocally, setDocuments, setIsLoading} from '../actions/documents';
import {getSessionToken} from '../selectors/auth';
import {IPendingDocument} from '../interfaces/documents';

export function* fetchDocuments(userId: number, policyId: string) {
    yield put(setIsLoading(true));
    const {body} = yield get(`users/${userId}/motor_policies/${policyId}/documents`);
    yield put(setDocuments(body.documents));
    yield put(setIsLoading(false));
}

export function* refetchDocuments(userId: number, policyId: string) {
    const {body} = yield get(`users/${userId}/motor_policies/${policyId}/documents`);
    yield put(setDocuments(body.documents));
}

export function* uploadDocuments(userId: number, policyId: string, docs: IPendingDocument[]) {
    const sessionToken = yield select(getSessionToken);

    const headers = new Headers({
        'Authorization': `Bearer ${sessionToken}`,
        'Accept': 'multipart/form-data',
    });

    yield docs.map(d => {
        const body = new FormData();
        body.append('data[type]', 'documents');
        body.append('data[attributes][attachment]', d.file);
        return post(`users/${userId}/motor_policies/${policyId}/documents`, body, headers, false);
    })
}

export function* removeDocument(userId: number, policyId: string, documentId: number) {
    yield remove(`users/${userId}/motor_policies/${policyId}/documents/${documentId}`);
    yield put(removeDocumentLocally(documentId));
}
