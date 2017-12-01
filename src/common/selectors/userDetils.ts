import {IReduxState} from '../interfaces/store';

export const getAddress = (state: IReduxState) => state.userDetails.address;