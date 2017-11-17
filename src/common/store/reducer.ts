import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import {reducer as form} from 'redux-form';
import policies from '../reducers/policies';

export const coreReducers = {
    auth,
    form,
    policies,
};

export function initReducer(reducers: any = {}) {
    return {
        ...reducers,
        ...coreReducers,
    }
}