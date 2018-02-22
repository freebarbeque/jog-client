import { combineReducers } from 'redux';

import vehiclesReducer from './vehicles/reducer';
import driversReducer from './drivers/reducer';
import addressesReducer from './addresses/reducer';
import documentsReducer from './documents/reducer';

export default combineReducers({
    vehicles: vehiclesReducer,
    drivers: driversReducer,
    addresses: addressesReducer,
    documents: documentsReducer,
});
