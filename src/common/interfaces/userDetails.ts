import {IDriver, IStoredDriver} from '../interfaces/drivers';
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
    availableDrivers: IStoredDriver[];
    availableVehicles: IVehicle[];
    address: IAddress|null;
    addressSubmitError: string|null;
    isLoading: boolean;
    postCode: string|null;
}

export interface IAddress {
    post_town: string;
    line_1: string;
    line_2: string;
    postcode: string;
}