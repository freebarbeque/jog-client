import {ICreatePolicyFormValues, IPolicy} from '../interfaces/policies';
import {format} from 'date-fns';

export function mapCreatePolicyFormValues(values: ICreatePolicyFormValues) {
    const {day, month, year, ...rest} = values;
    const mappedValues: Partial<IPolicy> = rest;

    mappedValues.expiry = format(`${year}-${month}-${day}`);

    return mappedValues;
}