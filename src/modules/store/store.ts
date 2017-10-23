import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

import mainNavReducer from "../../nav/main/NavigationReducer";

let middleWare = [thunkMiddleware, promiseMiddleware];

export default () => (
    createStore(
        combineReducers({
            mainNav: mainNavReducer,
        }),
        applyMiddleware(...middleWare)
    )
);