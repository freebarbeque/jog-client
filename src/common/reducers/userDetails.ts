import {IUserDetailsReduxState} from '../interfaces/userDetails';
import {IAction} from '../interfaces/action';
import {SET_ADDRESS, SET_IS_LOADING, SUBMIT_ADDRESS} from '../constants/userDetails';

const defaultState = {
    vehicles: {},
    drivers: {},
    address: null,
    isLoading: false,
}

export default function (state: IUserDetailsReduxState = defaultState, action: IAction) {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.address,
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }

        // todo: remove when integrated with the API
        case SUBMIT_ADDRESS:
            return {
                ...state,
                address: {
                    ...state.address,
                    submitted: true,
                }
            }

        default:
            return state;
    }
}