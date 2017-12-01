export interface IAddressFormValues {
    postcode: string;
}

export interface IUserDetailsReduxState {
    address: IAddress|null;
    isLoading: boolean;
}

export interface IAddress {
    post_town: string;
    line_1: string;
    line_2: string;
    submitted?: boolean; // todo: remove when integrated with the API
}