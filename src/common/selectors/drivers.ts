import {createSelector} from 'reselect';
import {IReduxState} from '../interfaces/store';

export const getDrivers = (state: IReduxState) => state.drivers.list;