import {put, select} from 'redux-saga/effects';
import {getSessionToken} from '../selectors/auth';
import {logOut} from '../actions/auth';

interface IApiError extends Error {
    status?: number;
}

function* getDefaultHeaders() {
    const sessionToken = yield select(getSessionToken);
    return new Headers({
        'Content-type': 'application/vnd.api+json',
        'Authorization': sessionToken,
        'Accept': 'application/vnd.api+json',
    });
}

function* handleErrors(response: any, parseResponseBody: boolean = true) {
    if (response.status === 200 || response.status === 201) {
        if (parseResponseBody) {
            return yield response.json();
        } else {
            return null;
        }
    } else {
        let error = yield response.text();
        if (error[0] === '{') {
            const res = JSON.parse(error);
            error = res.error || res.errors[0].body;
        }

        const err: IApiError = new Error(error || response.statusText);
        err.status = response.status;

        throw err;
    }
}

function* sendRequest(endpoint: string, parseResponseBody: boolean = true, method: string, headers: Headers, body?: string) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method,
            headers,
            body,
        }
    )

    const authorized = !!headers.get('Authorization');

    try {
        const body = yield handleErrors(response, parseResponseBody);
        return {body, headers: response.headers};
    } catch (err) {
        if (err.status === 401 && authorized) {
            yield put(logOut());
            return {body: {}, headers: response.headers, error: err}
        } else {
            throw err;
        }
    }
}

export function* post(endpoint: string, body?: any, passedHeaders?: Headers, parseResponseBody: boolean = true) {
    const headers = passedHeaders ? passedHeaders : yield getDefaultHeaders();

    const formdata = /multipart\/form-data/.test(headers.get('Accept'));

    const response = yield sendRequest(endpoint, parseResponseBody, 'POST', headers, formdata ? body : JSON.stringify(body));
    return response;
}

export function* get(endpoint: string, passedHeaders?: Headers, parseResponseBody: boolean = true) {
    const headers = passedHeaders ? passedHeaders : yield getDefaultHeaders();

    const response = yield sendRequest(endpoint, parseResponseBody, 'GET', headers);
    return response;
}

export function* remove(endpoint: string, passedHeaders?: Headers, parseResponseBody: boolean = true) {
    const headers = passedHeaders ? passedHeaders : yield getDefaultHeaders();

    const response = yield sendRequest(endpoint, parseResponseBody, 'DELETE', headers);
    return response;
}