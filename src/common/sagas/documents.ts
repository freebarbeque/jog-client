import {fork, put, race, select, take} from 'redux-saga/effects';
import {UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments} from '../selectors/documents';
import {getUser} from '../selectors/auth';
import {clearPendingDocuments, setDocumentSubmissionError, setIsLoading} from '../actions/documents';
import {fetchDocuments, uploadDocuments} from '../api/documents';
import {LOCATION_CHANGE} from 'react-router-redux';

export function* documentsFlow(policyId: string) {
    const user = yield select(getUser);
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
            yield uploadDocuments(user.id, policyId, docs);

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