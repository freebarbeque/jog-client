import {IReduxState} from '../interfaces/store';

export const getUser = (state: IReduxState) => state.auth.user;
export const getUserAddressId = (state: IReduxState) => state.auth.user!.addresses[0].id;
export const getSessionToken = (state: IReduxState) => state.auth.sessionToken;
export const getIsLoading = (state: IReduxState) => state.auth.isLoading;
export const getAuthError = (state: IReduxState) => state.auth.error;