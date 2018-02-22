function c(name: string) {
    return `MOTOR.${name}`;
}

export const POLICY_FETCH_STARTED = c('POLICY_FETCH_STARTED');
export const POLICY_FETCH_FAILED = c('POLICY_FETCH_FAILED');
export const POLICY_FETCH_FINISHED = c('POLICY_FETCH_FINISHED');

export const POLICY_ADD = c('POLICY_ADD');
export const POLICY_UPDATE = c('POLICY_UPDATE');
export const POLICY_REMOVE = c('POLICY_REMOVE');

export const POLICIES_FETCH_STARTED = c('POLICIES_FETCH_STARTED');
export const POLICIES_FETCH_FAILED = c('POLICIES_FETCH_FAILED');
export const POLICIES_FETCH_FINISHED = c('POLICIES_FETCH_FINISHED');
