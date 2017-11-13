import {IAuthReduxState} from "~/common/interfaces/auth";

export interface IReduxState {
    auth: IAuthReduxState;
}

export interface ICreateStoreOpts {
    enableDevTools?: boolean;
    freeze?: boolean;
    reducer: any;
    sagas?: any[];
    middleware?: any[];
}