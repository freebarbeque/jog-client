import {IDataSourceReduxState} from '../interfaces/dataSource';
import {IReduxState} from '../interfaces/store';

export const getDataSource = (state: IReduxState, name: keyof IDataSourceReduxState) => state.dataSource[name];