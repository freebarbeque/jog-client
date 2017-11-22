import {IDataSource, IDataSourceReduxState, ISetDataSourceAction} from '../interfaces/dataSource';
import {SET_DATA_SOURCE} from '../constants/dataSource';

export function setDataSource (name: keyof IDataSourceReduxState, dataSource: IDataSource[]): ISetDataSourceAction {
    return {
        type: SET_DATA_SOURCE,
        name,
        dataSource,
    }
}