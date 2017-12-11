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
export const getSelectedDriverId = (state: IReduxState, props: any) => state.userDetails.drivers[props.motorId];
export const getAvailableVehicles = (state: IReduxState) => state.userDetails.availableVehicles;
export const getSelectedVehicleId = (state: IReduxState, props: any) => state.userDetails.vehicles[props.motorId];
export const getVehicleData = (state: IReduxState) => state.userDetails.vehicleData;
export const getPostCodeFromState = (state: IReduxState) => state.userDetails.postCode;
export const getRegistrationNumber = (state: IReduxState) => state.userDetails.registrationNumber;

export const getVehicleDataForm = createSelector(
    getVehicleData,
    (data: IVehicleDetailsFormValues) => data ? {
        manufacturer_id: `${data.manufacturer_id.slice(0, 1)}${data.manufacturer_id.slice(1).toLocaleLowerCase()}`,
        motor_vehicle_model_id: `${data.motor_vehicle_model_id.slice(0, 1)}${data.motor_vehicle_model_id.slice(1).toLocaleLowerCase()}`,
        number_of_seats: data.number_of_seats,
        date_of_registration: moment(data.date_of_registration),
        abs: data.abs || false,
        imported: data.imported || false,
        modified: data.modified || false,
        tracking_device: data.tracking_device || false,
        purchase: data.purchase || false,
        abi_code: data.abi_code || '',
        alarm: data.alarm || '',
        date_of_manufacture: data.date_of_manufacture ? moment(data.date_of_manufacture) : null,
        date_of_purchase: data.date_of_purchase ? moment(data.date_of_purchase) : null,
        drive: data.drive || '',
        motor_vehicle_storage_location: data.motor_vehicle_storage_location || '',
        value_cents: data.value_cents || '',
        ownership: data.ownership || '',
        registered_keeper: data.registered_keeper || '',
    } : null
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
