import {IVehicle} from './vehicles';

export interface IAddressFormValues {
    postcode: string;
}

export interface IUserDetailsReduxState {
    vehicles: {
        [key: number]: string;
    };
    drivers: {
        [key: number]: string;
    };
    availableVehicles: IVehicle[];
    address: IAddress|null;
    addressSubmitError: string|null;
    isLoading: boolean;
    vehicleData: any;
    registrationNumber: any;
    postCode: string|null;
    driversList: any;
    submitDriver: boolean;
}

export interface IAddress {
    post_town: string;
    line_1: string;
    line_2: string;
    postcode: string;
}