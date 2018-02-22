import {IReduxState} from '../interfaces/store';

import authToken from 'src/web/next/utils/authToken';

export const getUser = (state: IReduxState) => state.nextStore.auth.currentUser;
export const getUserAddressId = (state: IReduxState) => state.auth.user!.addresses[0].id;
export const getSessionToken = (state: IReduxState) => authToken.get();
export const getIsLoading = (state: IReduxState) => state.auth.isLoading;
export const getAuthError = (state: IReduxState) => state.auth.error;