import {fork, put, race, select, take} from 'redux-saga/effects';
import {REMOVE_DOCUMENT, UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments, getPreviewDocument} from '../selectors/documents';
import {getUser} from '../selectors/auth';
import {fetchDocuments, removeDocument, uploadDocuments} from '../api/documents';
import {LOCATION_CHANGE} from 'react-router-redux';
import {
    clearPendingDocuments, setDocumentFile,
    setDocumentSubmissionError,
    setIsLoading, setIsPreviewLoading
} from '../actions/documents';
import {get} from '../api/request';
import {OPEN_MODAL} from '../../web/constants/page';
const {takeEvery} = require('redux-saga/effects');
import {PDF_PREVIEW_MODAL} from '../../web/constants/documents';
import {IAction} from '../interfaces/action';

export function* documentsFlow(policyId: string) {
    const user = yield select(getUser);
    yield fork(fetchDocuments, user.id, policyId);
    yield fork(takeEvery, (action: IAction) => action.type === OPEN_MODAL && action.modal === PDF_PREVIEW_MODAL, downloadDocument);

    while (true) {
        try {
            const {upload, remove, location} = yield race({
                upload: take(UPLOAD_PENDING_DOCUMENTS),
                remove: take(REMOVE_DOCUMENT),
                location: take(LOCATION_CHANGE),
            });

            if (location) {
                break;
            }

            yield put(setIsLoading(true));
            yield put(setDocumentSubmissionError(null));

            const docs = yield select(getPendingDocuments);

            if (upload && docs.length) {
                yield uploadDocuments(user.id, policyId, docs);
                yield fetchDocuments(user.id, policyId);
                yield put(clearPendingDocuments());
            } else if (remove) {
                const {documentId} = remove;
                yield removeDocument(user.id, policyId, documentId);
            }

            yield put(setIsLoading(false));
        } catch (err) {
            yield put(setDocumentSubmissionError(err));
            yield put(setIsLoading(false));
            continue;
        }
    }
}

export function* downloadDocument() {
    yield put(setIsPreviewLoading(true));
    const previewDoc = yield select(getPreviewDocument);

    if (previewDoc && !previewDoc.file) {
        try {
            const {body} = yield get(previewDoc.attachment.url, new Headers({}), false);
            const buffer = yield body.arrayBuffer();
            yield put(setDocumentFile(previewDoc.id, buffer));
        } catch (err) {
            console.error(err);
        }
    }
    yield put(setIsPreviewLoading(false));
}