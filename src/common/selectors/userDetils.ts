import {IReduxState} from '../interfaces/store';
import {createSelector} from 'reselect';
import {IVehicle} from '../interfaces/vehicles';
import {getCurrentMotorPolicy} from '../selectors/policies';
import {IMotorPolicy} from '../interfaces/policies';
import {IVehicleDetailsFormValues} from '../interfaces/vehicles';
const moment = require('moment');

export const getAddress = (state: IReduxState) => state.userDetails.address;
export const getAddressSubmitError = (state: IReduxState) => state.userDetails.addressSubmitError;
export const getIsLoading = (state: IReduxState) => state.userDetails.isLoading;
export const getDriversList = (state: IReduxState) => state.userDetails.driversList;
export const getSelectedDriverId = (state: IReduxState, props: any) => state.userDetails.drivers[props.motorId];
export const getAvailableVehicles = (state: IReduxState) => state.userDetails.availableVehicles;
export const getSelectedVehicleId = (state: IReduxState, props: any) => state.userDetails.vehicles[props.motorId];
export const getVehicleData = (state: IReduxState) => state.userDetails.vehicleData;
export const getPostCodeFromState = (state: IReduxState) => state.userDetails.postCode;
export const getRegistrationNumber = (state: IReduxState) => state.userDetails.registrationNumber;

export const getVehicleDataForm = createSelector(
    getVehicleData,
    (data: IVehicleDetailsFormValues) => data ? {
        ...data,
        manufacturer_id: data.manufacturer_id ? `${data.manufacturer_id.slice(0, 1)}${data.manufacturer_id.slice(1).toLocaleLowerCase()}` : null,
        motor_vehicle_model_id: data.motor_vehicle_model_id ? `${data.motor_vehicle_model_id.slice(0, 1)}${data.motor_vehicle_model_id.slice(1).toLocaleLowerCase()}` : null,
        date_of_registration: data.date_of_registration ? moment(data.date_of_registration) : null,
        date_of_manufacture: data.date_of_manufacture ? moment(data.date_of_manufacture) : null,
        date_of_purchase: data.date_of_purchase ? moment(data.date_of_purchase) : null,
    } : null,
);

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
