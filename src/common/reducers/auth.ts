import {IAuthReduxState} from '../interfaces/auth';
import {SET_USER} from '../constants/auth';
import {IAction} from '../interfaces/action';

const defaultState = {
    user: null,
};

export default function (state: IAuthReduxState = defaultState, action: IAction) {
    switch (action.type) {

        case SET_USER: {
            return {
                ...state,
                user: action.user,
            }
        }

        default: {
            return state;
        }

    }
}