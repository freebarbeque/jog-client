import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';

import { API, API_CALL_ACTION } from 'src/web/next/api';
import { SET_CURRENT_USER } from './constants';

export function retrieveCurrentUser() {
    return async (dispatch) => {
        const user = await dispatch({
            type: API_CALL_ACTION,
            executor: () => API.getCurrentUser(),
        });

        await dispatch({type: SET_CURRENT_USER, payload: { user }});
        dispatch(push('/'));
    }
}

export function logout() {
    return async (dispatch) => {
        dispatch({
            type: API_CALL_ACTION,
            executor: () => API.logout(),
        });

        dispatch({type: SET_CURRENT_USER, payload: { user: null }});
    }
}

interface ICredentials {
    email: string,
    password: string
}

export function login(credentials: ICredentials) {
    return async (dispatch) => {
        try {
            const {user} = await dispatch({
                type: API_CALL_ACTION,
                executor: () => API.login(credentials),
            });

            await dispatch({type: SET_CURRENT_USER, payload: {user}});

            dispatch(push('/'));
        } catch (error) {
            throw new SubmissionError({
                email: 'Invalid email or password',
                password: 'Invalid email or password',
            })
        }
    }
}

interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
}

export function join(userData: IUser) {
    return async (dispatch) => {
        const { user } = await dispatch({
            type: API_CALL_ACTION,
            executor: () => API.join(userData),
        });

        await dispatch({type: SET_CURRENT_USER, payload: {user}});

        dispatch(push('/auth/join/confirmation'));
    }
}

export function restore(email: string) {
    return async (dispatch) => {
        await dispatch({
            type: API_CALL_ACTION,
            executor: () => API.restore(email),
        });
    }
}
