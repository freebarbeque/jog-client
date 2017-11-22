export interface IDataSource {
    id: number|string;
    name: string;
}

export interface IDataSourceReduxState {
    insuranceCompanies: IDataSource[];
}

export interface ISetDataSourceAction {
    type: string;
    name: keyof IDataSourceReduxState;
    dataSource: IDataSource[];
}