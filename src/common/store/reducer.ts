import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import {reducer as form} from 'redux-form';
import policies from '../reducers/policies';
import documents from '../reducers/documents';
import dataSource from '../reducers/dataSource';
import drivers from '../reducers/drivers';
import userDetails from '../reducers/userDetails';

export const coreReducers = {
    auth,
    form,
    policies,
    documents,
    dataSource,
    drivers,
    userDetails,
};

export function initReducer(reducers: any = {}) {
    return {
        ...reducers,
        ...coreReducers,
    }
}