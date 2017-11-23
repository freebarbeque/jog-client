import {put, select} from 'redux-saga/effects';
import {getSessionToken} from '../selectors/auth';
import {logOut} from '../actions/auth';
interface IApiError extends Error {
    status?: number;
}

function* getHeaders(authorized: boolean) {
    if (authorized) {
        const sessionToken = yield select(getSessionToken);
        return new Headers({
            'Content-type': 'application/vnd.api+json',
            'Authorization': sessionToken,
            'Accept': 'application/vnd.api+json',
        });
    } else {
        return new Headers({
            'Content-type': 'application/vnd.api+json',
        });
    }
}

function* handleErrors (response: any, parseResponseBody: boolean = true) {
    if (response.status === 200 || response.status === 201) {
        if (parseResponseBody) {
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

function* sendRequest(endpoint: string, parseResponseBody: boolean = true, method: string, headers: Headers, authorized: boolean, body?: string) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method,
            headers,
            body,
        }
    )

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

export function* post(endpoint: string, body?: any, parseResponseBody: boolean = true, authorized: boolean = true) {
    const headers = yield getHeaders(authorized);

    const response = yield sendRequest(endpoint, parseResponseBody, 'POST', headers, authorized, JSON.stringify(body));
    return response;
}

export function* get(endpoint: string, parseResponseBody: boolean = true, authorized: boolean = true) {
    const headers = yield getHeaders(authorized);

    const response = yield sendRequest(endpoint, parseResponseBody, 'GET', headers, authorized);
    return response;
}