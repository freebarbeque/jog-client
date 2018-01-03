import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import {reducer as form} from 'redux-form';
import policies from '../reducers/policies';
import documents from '../reducers/documents';
import dataSource from '../reducers/dataSource';
import userDetails from '../reducers/userDetails';
import vehicles from '../reducers/vehicles';
import policyQuoteRequest from '../reducers/policyQuoteRequest';

export const coreReducers = {
    auth,
    form,
    policies,
    documents,
    dataSource,
    userDetails,
    vehicles,
    policyQuoteRequest,
};

export function initReducer(reducers: any = {}) {
    return {
        ...reducers,
        ...coreReducers,
    }
}