export interface IReduxState {

}

export interface ICreateStoreOpts {
    enableDevTools?: boolean;
    freeze?: boolean;
    reducer: any;
    sagas?: any[];
    middleware?: any[];
}