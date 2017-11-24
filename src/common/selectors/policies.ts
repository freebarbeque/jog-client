import {createSelector} from 'reselect';
import {IReduxState} from '../interfaces/store';
import {MOTOR_POLICY} from '../constants/policies';
import {IMotorPolicy} from 'src/common/interfaces/policies';
const moment = require('moment');
import {GBP} from 'src/common/constants/currency';

export const getPolicies = (policyType: string) => (state: IReduxState) => {
    switch (policyType) {
        case MOTOR_POLICY: {
            return state.policies.motorPolicies;
        }

        default: {
            throw new Error('Unknown policy type');
        }
    }
};

export const getCurrentMotorPolicy = (motorPolicyId: string) => createSelector(
  getPolicies(MOTOR_POLICY),
  (motorPolicies: IMotorPolicy[]) => {
    if (motorPolicies) {
        const currentPolicy = motorPolicies.find(m => m.id === Number(motorPolicyId));
        if (currentPolicy) {
            const today = moment();
            const expiryDate = moment(currentPolicy.expiry);
            const daysLeft = expiryDate.diff(today, 'days');
            const formattedExpiryDate = expiryDate.format('DD MMM YYYY');
            const costPerMonth = currentPolicy.annual_cost_currency === GBP ? `£${currentPolicy.annual_cost_cents / 100}` : `$${currentPolicy.annual_cost_cents / 100}`;
            return Object.assign({}, currentPolicy, {daysLeft, expiry: formattedExpiryDate, costPerMonth});
        }
        return currentPolicy;
    }
  }
);