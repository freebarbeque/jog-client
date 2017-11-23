import {take} from 'redux-saga/effects';
import {UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';

export function* documentsFlow() {
    yield take(UPLOAD_PENDING_DOCUMENTS);
    console.log('Will upload documents');
}