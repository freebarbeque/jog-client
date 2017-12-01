import {IDriver, IStoredDriver} from '../interfaces/drivers';
import {IVehicle} from '../reducers/vehicles';

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
    isLoading: boolean;
}

export interface IAddress {
    post_town: string;
    line_1: string;
    line_2: string;
    submitted?: boolean; // todo: remove when integrated with the API
}