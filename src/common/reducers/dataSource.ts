import {IDataSourceReduxState, ISetDataSourceAction} from '../interfaces/dataSource';
import {SET_DATA_SOURCE} from '../constants/dataSource';

const defaultState = {
    insuranceCompanies: [],
}

export default (state: IDataSourceReduxState = defaultState, action: ISetDataSourceAction) => {
    switch (action.type) {
        case SET_DATA_SOURCE: {
            return {
                ...state,
                [action.name]: action.dataSource,
            }
        }
        default: {
            return state;
        }
    }
}