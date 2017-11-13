import { combineReducers } from 'redux';
import auth from '../reducers/auth';

export const coreReducers = {
    auth,
};

export function initReducer(reducers = {}) {
    return combineReducers({
        ...reducers,
        ...coreReducers,
    })
}