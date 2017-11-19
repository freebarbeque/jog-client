import {put, select} from 'redux-saga/effects';
import {getSessionToken} from '../selectors/auth';
import {logOut} from '../actions/auth';
interface IApiError extends Error {
    status?: number;
}

function* handleErrors (response: any, parseBody: boolean = true) {
    if (response.status === 200) {
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

function* sendRequest(endpoint: string, parseBody: boolean = true, method: string, headers: Headers) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method,
            headers,
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

export function* post(endpoint: string, parseBody: boolean = true) {
    const headers = new Headers({
        'Content-type': 'application/json',
    });

    const response = yield sendRequest(endpoint, parseBody, 'POST', headers);
    return response;
}

export function* get(endpoint: string, parseBody: boolean = true) {
    const sessionToken = yield select(getSessionToken);
    const headers = new Headers({
        'Content-type': 'application/json',
        'Authorization': sessionToken,
        'Accept': 'application/vnd.api+json',
    });

    const response = yield sendRequest(endpoint, parseBody, 'GET', headers);
    return response;
}