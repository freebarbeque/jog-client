import {fork, put, race, select, take} from 'redux-saga/effects';
import {UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments} from '../selectors/documents';
import {post} from '../api/request';
import {getSessionToken, getUser} from '../selectors/auth';
import {clearPendingDocuments, setDocumentSubmissionError, setIsLoading} from '../actions/documents';
import {fetchDocuments} from '../api/documents';
import {LOCATION_CHANGE} from 'react-router-redux';

export function* documentsFlow(policyId: string) {
    const user = yield select(getUser);
    const sessionToken = yield select(getSessionToken);
    yield fork(fetchDocuments, user.id, policyId);

    while (true) {
        try {
            const {upload, location} = yield race({
                upload: take(UPLOAD_PENDING_DOCUMENTS),
                location: take(LOCATION_CHANGE),
            });

            if (location) {
                break;
            }

            yield put(setIsLoading(true));
            yield put(setDocumentSubmissionError(null));
            const docs = yield select(getPendingDocuments);

            const headers = new Headers({
                'Authorization': sessionToken,
                'Accept': 'multipart/form-data',
            });

            yield docs.map(d => {
                const body = new FormData();
                body.append('data[type]', 'documents');
                body.append('data[attributes][attachment]', d.file);
                return post(`users/${user.id}/motor_policies/${policyId}/documents`, body, headers, false);
            })
            yield fetchDocuments(user.id, policyId);
            yield put(clearPendingDocuments());

            yield put(setIsLoading(false));
        } catch (err) {
            yield put(setDocumentSubmissionError(err));
            yield put(setIsLoading(false));
            continue;
        }
    }
}