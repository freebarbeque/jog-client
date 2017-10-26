import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import mainNavReducer from "../../nav/main/NavigationReducer";
import policyInfoReducer from '../../screens/PolicyInfo/policyInfoReducer';

let middleWare = [thunkMiddleware, promiseMiddleware];

export default () => (
    createStore(
        combineReducers({
            mainNav: mainNavReducer,
            policyInfo: policyInfoReducer
        }),
        applyMiddleware(...middleWare)
    )
);