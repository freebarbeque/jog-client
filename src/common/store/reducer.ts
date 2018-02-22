import { combineReducers } from 'redux';
import auth from '../reducers/auth';
import {reducer as form} from 'redux-form';
import policies from '../reducers/policies';
import documents from '../reducers/documents';
import dataSource from '../reducers/dataSource';
import userDetails from '../reducers/userDetails';
import vehicles from '../reducers/vehicles';
import policyQuoteRequest from '../reducers/policyQuoteRequest';
import quoteAddresses from '../reducers/quoteAddresses';
import quoteVehicle from '../reducers/quote/vehicle';
import nextStore from '../../web/next/store';

export const coreReducers = {
    auth,
    form,
    policies,
    documents,
    dataSource,
    userDetails,
    vehicles,
    quoteAddresses,
    policyQuoteRequest,
    quoteVehicle,
    nextStore,
};

export function initReducer(reducers: any = {}) {
    return {
        ...reducers,
        ...coreReducers,
    }
}