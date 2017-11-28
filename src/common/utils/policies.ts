import {ICreatePolicyFormValues, IPatchPolicyFormValues, IPolicy} from '../interfaces/policies';
import {format} from 'date-fns';

export function mapCreatePolicyFormValues(values: ICreatePolicyFormValues) {
    const {day, month, year, ...rest} = values;
    const mappedValues: Partial<IPolicy> = rest;

    mappedValues.expiry = format(`${year}-${month}-${day}`);
    mappedValues.no_claims_bonus = values.no_claims_bonus || 0;
    mappedValues.annual_cost_cents = values.annual_cost_cents * 100;

    return mappedValues;
}

export const mapPatchPolicyFormValues = (values: IPatchPolicyFormValues) => {
    const {day, month, year, ...rest} = values;
    const mappedValues: Partial<IPolicy> = rest;

    mappedValues.expiry = format(`${year}-${month}-${day}`);
    mappedValues.annual_cost_cents = Number(values.annual_cost_cents) * 100;

    return mappedValues;
}