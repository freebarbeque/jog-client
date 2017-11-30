import {IUserDetailsReduxState} from '../interfaces/userDetails';
import {IAction} from '../interfaces/action';
import {SET_ADDRESS} from '../constants/userDetails';

const defaultState = {
    address: null
}

export default function (state: IUserDetailsReduxState = defaultState, action: IAction) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address,
            }
        default:
            return state;
    }
}