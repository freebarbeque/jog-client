import {put, select} from 'redux-saga/effects';
import {getSessionToken} from '../selectors/auth';
import {logOut} from '../actions/auth';
interface IApiError extends Error {
    status?: number;
}

function* getHeaders() {
    const sessionToken = yield select(getSessionToken);
    return new Headers({
        'Content-type': 'application/vnd.api+json',
        'Authorization': sessionToken,
        'Accept': 'application/vnd.api+json',
    });
}

function* handleErrors (response: any, parseBody: boolean = true) {
    if (response.status === 200 || response.status === 201) {
        if (parseBody) {
            return yield response.json();
        } else {
            return null;
        }
    } else {
        let error = yield response.text();
        if (error[0] === '{') {
            error = JSON.parse(error).errors[0].body;
        }

        const err: IApiError = new Error(error || response.statusText);
        err.status = response.status;

        throw err;
    }
}

function* sendRequest(endpoint: string, parseBody: boolean = true, method: string, headers: Headers, body?: string) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method,
            headers,
            body,
        }
    )

    try {
        const body = yield handleErrors(response, parseBody);
        return {body, headers: response.headers};
    } catch (err) {
        if (err.status === 401 && err.message === 'Unauthorized') {
            yield put(logOut());
            return {body: {}, headers: response.headers, error: err}
        } else {
            throw err;
        }
    }
}

export function* post(endpoint: string, body?: any, parseBody: boolean = true) {
    const headers = yield getHeaders();

    const response = yield sendRequest(endpoint, parseBody, 'POST', headers, JSON.stringify(body));
    return response;
}

export function* get(endpoint: string, parseBody: boolean = true) {
    const headers = yield getHeaders();

    const response = yield sendRequest(endpoint, parseBody, 'GET', headers);
    return response;
}