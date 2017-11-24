import {fork, put, select, take} from 'redux-saga/effects';
import {UPLOAD_PENDING_DOCUMENTS} from '../constants/documents';
import {getPendingDocuments} from '../selectors/documents';
import {post} from '../api/request';
import {getSessionToken, getUser} from '../selectors/auth';
import {setDocumentSubmissionError, setIsLoading} from "~/common/actions/documents";
import {fetchDocuments} from "~/common/api/documents";
/*
async function readFile(file: File) {
    const reader = new FileReader();

    const promise = new Promise((resolve) => {
        reader.onload = function(evt: any) {
            resolve(evt.target.result);
        };
    })

    reader.readAsBinaryString(file);

    await promise;
    return reader.result;
}

export function* documentsFlow() {
    const user = yield select(getUser);

    yield take(UPLOAD_PENDING_DOCUMENTS);
    const docs = yield select(getPendingDocuments);
    const file = yield readFile(docs[0].file);

    const sessionToken = yield select(getSessionToken);

    const headers = new Headers({
        'Content-Type': 'multipart/form-data; boundary=boundary123',
        'Authorization': sessionToken,
        'Accept': 'multipart/form-data',
    });

    let body = '\r\n';
    body = body + '--boundary123\r\n';
    body = body + 'Content-Disposition: form-data; name="data[type]"\r\n\r\ndocuments\r\n';
    body = body + '--boundary123\r\n';
    body = body + 'Content-Disposition: form-data; name="data[attributes][attachment]"; filename="Certificate.pdf"\r\n';
    body = body + 'Content-Type: application/pdf\r\n\r\n';
    body = body + file;
    body = body + '\r\n--boundary123--';

    yield fetch(
        'https://jog-api-staging.herokuapp.com/api/users/46/motor_policies/26/documents',
        {
            method: 'POST',
            headers,
            body,
        }
    )
}
*/

export function* documentsFlow(policyId: string) {
    const user = yield select(getUser);
    const sessionToken = yield select(getSessionToken);
    yield fork(fetchDocuments, user.id, policyId);

    while (true) {
        try {
            const {policyId} = yield take(UPLOAD_PENDING_DOCUMENTS);
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

            yield put(setIsLoading(false));
        } catch (err) {
            yield put(setDocumentSubmissionError(err));
            yield put(setIsLoading(false));
            continue;
        }
    }
}