import {createSelector} from 'reselect';

const moment = require('moment');
import {getFormValues} from 'redux-form';
import {IReduxState} from '../interfaces/store';
import {EDIT_POLICY_OVERVIEW_FORM, MOTOR_POLICY} from '../constants/policies';
import {IInsurer, IMotorPolicy, IPoliciesReduxState, IPolicy} from '../interfaces/policies';
import {getInsuranceCompanies} from '../selectors/dataSource';
import {GBP} from '../constants/currency';
import {IDataSource} from '../interfaces/dataSource';

interface IPropsWithMotorId {
    motorId: string;
    [key: string]: any;
}

export const getIsLoading = (state: IReduxState) => state.policies.isLoading;

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

export const getCurrentMotorPolicy = createSelector(
    getPolicies(MOTOR_POLICY),
    (state: IReduxState, props: IPropsWithMotorId) => props.motorId,
    (motorPolicies: IMotorPolicy[], motorPolicyId) => motorPolicies.find(m => m.id === Number(motorPolicyId)),
)

export const getCurrentMotorPolicyWithDaysLeft = createSelector(
    getPolicies(MOTOR_POLICY),
    getInsuranceCompanies,
    (state: IReduxState, props: IPropsWithMotorId) => props.motorId,
    (motorPolicies: IMotorPolicy[], insuranceCompanies: IDataSource[], motorPolicyId) => {
        if (motorPolicies) {
            const currentPolicy = motorPolicies.find(m => m.id === Number(motorPolicyId));
            if (currentPolicy) {
                const today = moment();
                const expiryDate = moment(currentPolicy.expiry);
                const daysLeft = expiryDate.diff(today, 'days');
                const formattedExpiryDate = expiryDate.format('DD MMM YYYY');
                const annualCost = currentPolicy.annual_cost_currency === GBP ? `£${Number(currentPolicy.annual_cost_cents) / 100}` : `$${Number(currentPolicy.annual_cost_cents) / 100}`;
                const excess = currentPolicy.excess_amount_currency === GBP ? `£${currentPolicy.excess_amount_cents / 100}` : `$${currentPolicy.excess_amount_cents / 100}`;
                const insuranceCompany = insuranceCompanies.find(c => c.id === currentPolicy.insurance_company_id);

                return Object.assign({}, currentPolicy, {
                    daysLeft,
                    expiry: formattedExpiryDate,
                    annualCost,
                    insuranceCompanyName: insuranceCompany ? insuranceCompany.name : '',
                    excess,
                });
            }
            return currentPolicy;
        }
    }
);

export const getEditOverviewFormInitialValues = createSelector(
    getPolicies(MOTOR_POLICY),
    getInsuranceCompanies,
    (state: IReduxState, props: IPropsWithMotorId) => props.motorId,
    (motorPolicies: IMotorPolicy[], insuranceCompanies: IDataSource[], motorPolicyId) => {
        const currentPolicy = motorPolicies.find(m => m.id === Number(motorPolicyId));
        if (currentPolicy) {
            const insuranceCompany = insuranceCompanies.find(c => c.id === currentPolicy.insurance_company_id);
            const expiryDate = moment(currentPolicy.expiry, 'YYYY-MM-DD');
            const year = expiryDate.year();
            const day = expiryDate.date();
            const month = expiryDate.month();

            return {
                annual_cost_cents: `${Number(currentPolicy.annual_cost_cents) / 100}`,
                insurance_company_id: currentPolicy.insurance_company_id,
                policy_number: currentPolicy.policy_number,
                year,
                day,
                month: month + 1,
            };
        }
        return currentPolicy;
    }
);

export const getEditOverviewDaysLeft = createSelector(
    getFormValues(EDIT_POLICY_OVERVIEW_FORM),
    (formValues: any) => {
        if (formValues) {
            const day = formValues.day;
            const month = formValues.month;
            const year = formValues.year;
            const today = moment();

            if (day && month && year) {
                const expiryDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
                return expiryDate.diff(today, 'days');
            }
        }

        return 0;
    }
);

export const getMotorPolicyIncompleteKeys = createSelector(
    getCurrentMotorPolicy,
    (currentPolicy: IMotorPolicy) => {
        return Object.keys(currentPolicy).filter(key => currentPolicy[key] === null);
    }
)
