import {select, take} from 'redux-saga/effects';
import {UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments} from '../selectors/documents';
import {post} from '../api/request';
import {getUser} from '../selectors/auth';

export function* documentsFlow() {
    const user = yield select(getUser);

    yield take(UPLOAD_PENDING_DOCUMENTS);
    const docs = yield select(getPendingDocuments);

    const attributes = new FormData();
    attributes.append('attachment', docs[0]);

    yield post(`users/${user.id}/motor_policies/26/documents`, {
        data: {
            type: 'documents',
            attributes,
        }
    })
}