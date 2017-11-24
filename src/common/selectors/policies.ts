import {createSelector} from 'reselect';
const moment = require('moment');
import {IReduxState} from '../interfaces/store';
import {MOTOR_POLICY} from '../constants/policies';
import {IInsurer, IMotorPolicy} from '../interfaces/policies';
import {getInsuranceCompanies} from '../selectors/dataSource';
import {GBP} from '../constants/currency';
import {IDataSource} from '../interfaces/dataSource';

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
  getInsuranceCompanies,
  (motorPolicies: IMotorPolicy[], insuranceCompanies: IDataSource[]) => {
    if (motorPolicies) {
        const currentPolicy = motorPolicies.find(m => m.id === Number(motorPolicyId));
        if (currentPolicy) {
            const today = moment();
            const expiryDate = moment(currentPolicy.expiry);
            const daysLeft = expiryDate.diff(today, 'days');
            const formattedExpiryDate = expiryDate.format('DD MMM YYYY');
            const costPerMonth = currentPolicy.annual_cost_currency === GBP ? `£${currentPolicy.annual_cost_cents / 100}` : `$${currentPolicy.annual_cost_cents / 100}`;
            const excess = currentPolicy.excess_amount_currency === GBP ? `£${currentPolicy.excess_amount_cents / 100}` : `$${currentPolicy.excess_amount_cents / 100}`;
            const insuranceCompany = insuranceCompanies.find(c => c.id === currentPolicy.insurance_company_id);

            return Object.assign({}, currentPolicy, {
                daysLeft,
                expiry: formattedExpiryDate,
                costPerMonth,
                insuranceCompanyName: insuranceCompany ? insuranceCompany.name : '',
                excess,
            });
        }
        return currentPolicy;
    }
  }
);