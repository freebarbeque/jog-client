export interface IPoliciesReduxState {
    motorPolicies: IMotorPolicy[] | null;
}

export interface IPolicy {
    id: number | string;
    name: string;
    status?: string;
    annual_cost_cents: number | string;
    expiry: string;
    insurance_company_id: number|string;
    ownership: string;
    policy_number: number|string;
    vehicle_registration: number;
    no_claims_bonus: number;
    excess_amount_cents: number;
    avatar: string;
    level_of_cover: string;
    type: string;
}

export interface IMotorPolicy extends IPolicy {
    annual_cost_currency: string;
    excess_amount_currency: string;
    vehicle_manufacturer_name: string;
    vehicle_model_name: string;
    driver_name: string;
}

export interface IMotorPolicyWithDaysLeft extends IMotorPolicy {
    daysLeft: number;
    annualCost: string;
    insuranceCompanyName: string;
    excess: string;
}

export interface IInsurer {
    id: number | string;
    name: string;
}

export interface ICreatePolicyFormValues {
    insurance_company_id: string|number;
    policy_number: string|number;
    day: number;
    month: number;
    year: number;
    annual_cost_cents: number;
    level_of_cover: 'Third party' | 'Third party, fire and theft' | 'Comprehensive';
    no_claims_bonus: number;
}

export interface IPatchPolicyFormValues {
    insurance_company_id: string|number;
    policy_number: string|number;
    day: number;
    month: number;
    year: number;
    vehicle_manufacturer_name: string;
    vehicle_model_name: string;
    annual_cost_cents: string|number;
    excess_amount_cents: number;
    level_of_cover: 'Third party' | 'Third party, fire and theft' | 'Comprehensive';
    no_claims_bonus: number;
    driver_name: string;
}

export interface IPoliciesReduxState {
    motorPolicies: IMotorPolicy[]|null;
    isLoading: boolean,
}
