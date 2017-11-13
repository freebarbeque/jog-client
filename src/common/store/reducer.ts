import { combineReducers } from 'redux';

export const coreReducers = {};

export function initReducer(reducers = {}) {
    return combineReducers({
        ...reducers,
        ...coreReducers,
    })
}