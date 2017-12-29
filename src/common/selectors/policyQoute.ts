export const getPolicyQuote = (state: any, policyId: any) => state.policyQuote.quotes[policyId] || {};
export const getLoadingState = (state: any) => state.policyQuote.isLoading;
