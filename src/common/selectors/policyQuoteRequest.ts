import {createSelector} from 'reselect';
const moment = require('moment');

export const getPolicyQuoteRequest = (state: any, policyId: any) => state.policyQuoteRequest[policyId] || {};
export const getLoadingState = (state: any, policyId: any) => state.policyQuoteRequest[policyId] ? state.policyQuoteRequest[policyId].isLoading : false;

export const getStartPolicyDate = createSelector(
    (state, props) => getPolicyQuoteRequest(state, props.motorId),
    (policyQuoteRequest) => {
        if (policyQuoteRequest && policyQuoteRequest.startDate) {
            return moment(policyQuoteRequest.startDate);
        }

        return null;
    }
);
