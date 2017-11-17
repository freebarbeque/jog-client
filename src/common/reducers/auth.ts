import {IAuthReduxState} from '../interfaces/auth';
import {SET_USER, SET_SESSION_TOKEN, SET_IS_LOADING} from '../constants/auth';
import {IAction} from '../interfaces/action';

const defaultState = {
    user: null,
    sessionToken: null,
    isLoading: false,
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

        default: {
            return state;
        }

    }
}