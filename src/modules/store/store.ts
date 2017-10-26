import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'remote-redux-devtools';
import mainNavReducer from "../../nav/main/NavigationReducer";
import policyInfoReducer from '../../screens/PolicyInfo/policyInfoReducer';
import CarQuestionsReducer from '../../screens/CarQuestions/CarQuestionsReducer';
import QuoteReducer from '../../screens/Quote/QuoteReducer';

let middleWare = [thunkMiddleware, promiseMiddleware];

export default () => (
    createStore(
        combineReducers({
            mainNav: mainNavReducer,
            policyInfo: policyInfoReducer,
            carQuestions: CarQuestionsReducer,
            quote: QuoteReducer
        }),
        composeWithDevTools(applyMiddleware(...middleWare))
    )
);