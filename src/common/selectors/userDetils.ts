import {IReduxState} from '../interfaces/store';
import {createSelector} from 'reselect';
import {IStoredDriver} from '../interfaces/drivers';
import {IVehicle} from '../interfaces/vehicles';
import {getCurrentMotorPolicy} from '../selectors/policies';
import {IMotorPolicy} from '../interfaces/policies';
const moment = require('moment');

export const getAddress = (state: IReduxState) => state.userDetails.address;
export const getAddressSubmitError = (state: IReduxState) => state.userDetails.addressSubmitError;
export const getIsLoading = (state: IReduxState) => state.userDetails.isLoading;
export const getAvailableDrivers = (state: IReduxState) => state.userDetails.availableDrivers;
export const getSelectedDriverId = (state: IReduxState, props: any) => state.userDetails.drivers[props.motorId];
export const getAvailableVehicles = (state: IReduxState) => state.userDetails.availableVehicles;
export const getSelectedVehicleId = (state: IReduxState, props: any) => state.userDetails.vehicles[props.motorId];
export const getPostCodeFromState = (state: IReduxState) => state.userDetails.postCode;

export const getPostCode = createSelector(
    getPostCodeFromState,
    (postCode: string) => postCode ? {
        postcode: postCode,
    } : {},
)

export const getUserAddress = (state: IReduxState) => {
    if (state.auth.user !== null) {
        return state.auth.user.address;
    } else {
        return null; 
    } 
}
export const getDriversDataSource = createSelector(
    getAvailableDrivers,
    (drivers: IStoredDriver[]) => drivers.map(d => ({
        id: d.id,
        name: `${d.first_name} ${d.last_name}`,
    })),
)

export const getAvailableDriver = (driverId: string) => createSelector(
    getAvailableDrivers,
    (drivers: IStoredDriver[]) => drivers.find(d => d.id === driverId),
)

export const getVehicleInitialValues = createSelector(
    getAvailableVehicles,
    getSelectedVehicleId,
    (vehicles: IVehicle[], vehicleId: string) => {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (!vehicle) {
            return {abs: true, imported: true, modified: true, tracking_device: true};
        }

        const {
            id,
            ...values,
        } = vehicle;

        return values;
    }
)

export const getDatePickerInitialValues = createSelector(
    getCurrentMotorPolicy,
    (policy: IMotorPolicy) => policy ? {
        date: moment(policy.expiry),
    } : policy,
)
