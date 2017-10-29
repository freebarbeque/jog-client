import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { composeWithDevTools } from 'remote-redux-devtools';
import mainNavReducer from "../../nav/main/NavigationReducer";
import policyInfoReducer from '../../screens/PolicyInfo/policyInfoReducer';
import CarQuestionsReducer from '../../screens/CarQuestions/CarQuestionsReducer';
import QuoteReducer from '../../screens/Quote/QuoteReducer';
import ManualEntryReducer from '../../screens/ManualEntry/ManualEntryReducer';
import YourQuotesReducer from '../../screens/YourQuotes/YourQuotesReducer';
import AnnualQuotesReducer from '../../screens/AnnualQuotes/AnnualQuotesReducer';

let middleWare = [thunkMiddleware, promiseMiddleware];

export default () => (
    createStore(
        combineReducers({
            mainNav: mainNavReducer,
            policyInfo: policyInfoReducer,
            carQuestions: CarQuestionsReducer,
            quote: QuoteReducer,
            manualEntry: ManualEntryReducer,
            yourQuotes: YourQuotesReducer,
            annualQuotes: AnnualQuotesReducer
        }),
        composeWithDevTools(applyMiddleware(...middleWare))
    )
);