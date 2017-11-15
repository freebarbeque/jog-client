import {IReduxState} from '../interfaces/store';

export const getUser = (state: IReduxState) => state.auth.user;
export const getIsLoading = (state: IReduxState) => state.auth.isLoading;