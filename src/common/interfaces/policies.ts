export interface IPoliciesReduxState {
    motorPolicies: IMotorPolicy[] | null;
}

export interface IPolicy {
    id: number | string;
    name: string;
    status: string;
    policyAvatar: string;
    type: string;
}

export interface IMotorPolicy extends IPolicy {

}

export interface IInsurer {
    id: number | string;
    name: string;
}