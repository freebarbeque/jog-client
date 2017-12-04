import {cancel, fork, put, race, select, take} from 'redux-saga/effects';
import {REMOVE_DOCUMENT, UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments, getPreviewDocument} from '../selectors/documents';
import {getUser} from '../selectors/auth';
import {fetchDocuments, removeDocument, uploadDocuments, refetchDocuments} from '../api/documents';
import {LOCATION_CHANGE} from 'react-router-redux';
import {
    clearPendingDocuments, setDocumentFile,
    setDocumentSubmissionError,
    setIsLoading,
    setIsUploading,
    setIsPreviewLoading,
} from '../actions/documents';
import {get} from '../api/request';
import {OPEN_MODAL} from '../../web/constants/page';
const {takeEvery} = require('redux-saga/effects');
import {PDF_PREVIEW_MODAL} from '../../web/constants/documents';
import {IAction} from '../interfaces/action';
import {createPolicy} from '../api/policies';
import {MOTOR_POLICY} from '../constants/policies';

export function* documentsWorker(policyId: string) {
    const user = yield select(getUser);
    if (policyId) {
        yield fork(fetchDocuments, user.id, policyId);
    }
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

            yield put(setIsUploading(true));
            yield put(setDocumentSubmissionError(null));

            const docs = yield select(getPendingDocuments);

            if (upload && docs.length) {
                if (!policyId) {
                    const {motor_policy} = yield createPolicy(user.id, MOTOR_POLICY, {});
                    policyId = motor_policy.id;
                }

                yield uploadDocuments(user.id, policyId, docs);
                yield refetchDocuments(user.id, policyId);
                yield put(clearPendingDocuments());
            } else if (remove) {
                const {documentId} = remove;
                yield removeDocument(user.id, policyId, documentId);
            }

            yield put(setIsUploading(false));
        } catch (err) {
            yield put(setDocumentSubmissionError(err));
            yield put(setIsUploading(false));
            continue;
        }
    }
}

export function* documentsFlow(policyId: string) {
    const worker = yield fork(documentsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(setIsLoading(false));
    yield put(setIsUploading(false));
    yield cancel(worker);
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