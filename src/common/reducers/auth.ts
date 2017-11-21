import {IAuthReduxState} from '../interfaces/auth';
import {IAction} from '../interfaces/action';
import {
    SET_USER,
    SET_SESSION_TOKEN,
    SET_IS_LOADING,
    SET_AUTH_ERROR
} from '../constants/auth';

const defaultState = {
    user: null,
    sessionToken: null,
    isLoading: false,
    error: null,
};

export default function (state: IAuthReduxState = defaultState, action: IAction) {
    switch (action.type) {

        case SET_USER: {
            return {
                ...state,
                user: action.user,
            }
        }

        case SET_SESSION_TOKEN: {
            return {
                ...state,
                sessionToken: action.token,
            }
        }

        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading,
            }
        }

        case SET_AUTH_ERROR: {
            return {
                ...state,
                error: action.error,
            }
        }

        default: {
            return state;
        }

    }
}