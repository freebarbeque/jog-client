import {IAuthReduxState} from './auth';
import {Store} from 'redux';

export interface IStore extends Store<IReduxState> {
    runSaga: any;
}

export interface IReduxState {
    auth: IAuthReduxState;
    form: any;
    router: IRouterState;
}

export interface ICreateStoreOpts {
    enableDevTools?: boolean;
    freeze?: boolean;
    reducer: any;
    sagas?: any[];
    middleware?: any[];
}

export interface IRouterState {
    location: {
        search: string;
    }
}