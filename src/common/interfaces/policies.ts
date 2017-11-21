export interface IPoliciesReduxState {
    motorPolicies: IMotorPolicy[] | null;
}

export interface IPolicy {
    id: number | string;
    name: string;
    status: string;
    policyAvatar: string;
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
    insurer: string;
    number: string;
    day: string;
    month: string;
    year: string;
    cost: string;
    vehicle: 'owned' | 'leased' | 'financed';
    multi: boolean;
}