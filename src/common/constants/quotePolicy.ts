const c = name => `policyQuote/${name}`;

export const SET_VEHICLE_TO_QUOTE = c('SET_VEHICLE_TO_QUOTE');
export const SET_DRIVER_TO_QUOTE = c('SET_DRIVER_TO_QUOTE');
export const SET_ADDRESS_TO_QUOTE = c('SET_ADDRESS_TO_QUOTE');
export const REMOVE_DRIVER_FROM_QUOTE = c('REMOVE_DRIVER_FROM_QUOTE');
export const MAKE_QUOTE_POLICY_REQUEST = c('MAKE_QUOTE_POLICY_REQUEST');
export const SET_LOADING_STATE = c('SET_LOADING_STATE');

export const QUOTE_REQUESTS_TYPE_MOTOR_POLICY = 'motor_policy_quote_requests';