import {SET_DRIVERS, SET_LOADING} from '../constants/drivers';
import {IDriver} from '../interfaces/drivers';

export const setDrivers = (drivers: IDriver[]) => ({
  type: SET_DRIVERS,
  drivers,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  isLoading,
});