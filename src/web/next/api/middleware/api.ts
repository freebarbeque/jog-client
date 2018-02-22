import { SubmissionError } from 'redux-form';
import { normalize } from 'normalizr';

import { logout } from 'src/web/next/store/auth/actions';

export const API_CALL_ACTION = 'API.API_CALL_ACTION';

export const apiMiddleware = store => next => async action => {
    const isApiCallAction = action.type === API_CALL_ACTION ? action : null;

    if (!isApiCallAction) {
        return next(action);
    }

    const { executor, schema, formValidation = true } = action;

    if (typeof executor !== 'function') {
        throw new Error('api middleware: executor must be a function.');
    }

    try {
        const data = await executor();

        if (schema) {
            const normalizedData = Object.assign({}, normalize(data, schema));
            store.dispatch({ type: 'ENTITIES', ...normalizedData });
            return normalizedData.result;
        }

        return data;
    } catch (error) {
        if (isUnauthorized(error.response.status)) {
            store.dispatch(logout());
            throw new Error('User is not logged in.')
        }

        if (isBadRequest(error.response.status) && error.response.data && error.response.data.errors) {
            if (formValidation) {
                throw new SubmissionError({ ...error.response.data.errors });
            }

            // throw custom Error object with validationErrors: response.data.errors
        }

        throw new Error('Something went wrong. Please try again later.');
    }
};

function isUnauthorized(httpStatus: number) {
    return httpStatus === 403 || httpStatus === 401;
}

function isBadRequest(httpStatus: number) {
    const pattern = /^4[0-9]{2}$/i;
    return pattern.test(httpStatus.toString());
}