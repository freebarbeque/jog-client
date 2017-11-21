import {IReduxState} from '../interfaces/store';

export const getQueryString = (state: IReduxState) => state.router.location.search;