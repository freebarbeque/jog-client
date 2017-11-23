import {ICreatePolicyFormValues, IPolicy} from '../interfaces/policies';
import {format} from 'date-fns';

export function mapCreatePolicyFormValues(values: ICreatePolicyFormValues) {
    const {day, month, year, ...rest} = values;
    const mappedValues: Partial<IPolicy> = rest;

    mappedValues.expiry = format(`${year}-${month}-${day}`);

    return mappedValues;
}

export function getCreatePolicyQueryString (policy: Partial<IPolicy>) {
    const keys = Object.keys(policy);

    return keys.reduce((str, k) => `${str}&[data][attributes][${k}]=${policy[k]}`, '');
}