import { combineReducers } from 'redux';

import motorPolicyReducer from './motor/reducer';

export default combineReducers({
    motor: motorPolicyReducer,
})
