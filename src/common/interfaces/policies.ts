export interface IPoliciesReduxState {
    motorPolicies: IMotorPolicy[] | null;
}

export interface IPolicy {
    id: number | string;
    name: string;
    annual_cost_cents: number;
    expiry: string;
    insurance_company_id: number|string;
    ownership: string;
    policy_number: number|string;
    vehicle_registration: number;
    no_claims_bonus: number;
    excess_amount_cents: number;
    avatar: string;
    type: string;
    insurer: string;
}

export interface IMotorPolicy extends IPolicy {

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
    level_of_cover: 'Comprehensive' | '3rd Party' | '3rd Party, Fire & Theft';
    no_claims_bonus: number;
}