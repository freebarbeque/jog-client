import {IReduxState} from '../interfaces/store';
import {createSelector} from 'reselect';
import {IStoredDriver} from '../interfaces/drivers';

export const getAddress = (state: IReduxState) => state.userDetails.address;
export const getIsLoading = (state: IReduxState) => state.userDetails.isLoading;
export const getAvailableDrivers = (state: IReduxState) => state.userDetails.availableDrivers;

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