import { combineReducers } from 'redux';

import createAuthReducer from './auth/reducer';
import createEntitiesReducer from './entities/reducer';
import createPoliciesReducer from './policies/reducer';
import createUserDataReducer from './userData/reducer';
import createQuoteRequestsReducer from './quoteRequests/reducer';

export default combineReducers({
    entities: createEntitiesReducer,
    auth: createAuthReducer,
});
