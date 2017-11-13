import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import {reducer as form} from 'redux-form';

export const coreReducers = {
    auth,
    form,
};

export function initReducer(reducers = {}) {
    return combineReducers({
        ...reducers,
        ...coreReducers,
    })
}