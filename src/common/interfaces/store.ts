import {IAuthReduxState} from './auth';
import {Store} from 'redux';
import {IDataSourceReduxState} from '../interfaces/dataSource';
import {IMotorPolicy} from '../interfaces/policies';
import {IDocumentsReduxState} from '../interfaces/documents';

export interface IStore extends Store<IReduxState> {
    runSaga: any;
}

export interface IReduxState {
    auth: IAuthReduxState;
    form: any;
    dataSource: IDataSourceReduxState;
    router: IRouterState;
    policies: {
        motorPolicies: IMotorPolicy[];
    },
    documents: IDocumentsReduxState;
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