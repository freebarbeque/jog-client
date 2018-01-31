import {IAuthReduxState} from './auth';
import {Store} from 'redux';
import {IDataSourceReduxState} from '../interfaces/dataSource';
import {IMotorPolicy, IPoliciesReduxState} from '../interfaces/policies';
import {IDocumentsReduxState} from '../interfaces/documents';
import {IDriversReduxState} from '../interfaces/drivers';
import {IUserDetailsReduxState} from '../interfaces/userDetails';

export interface IStore extends Store<IReduxState> {
    runSaga: any;
}

export interface IReduxState {
    auth: IAuthReduxState;
    form: any;
    dataSource: IDataSourceReduxState;
    router: IRouterState;
    policies: IPoliciesReduxState,
    documents: IDocumentsReduxState;
    drivers: IDriversReduxState;
    userDetails: IUserDetailsReduxState;
    policyQuoteRequest: any;
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
