import TabNavigation from './components/YourQuotesTabs';
import { SHOW_ANNUAL_QUOTE_ACTION, SHOW_ANNUAL_QUOTES_LIST_ACTION } from '../../cfg/actions';

const initState = {
    index: 0,
    routes: [
        { key: 'AnnualQuotes', routeName: 'AnnualQuotes' },
        { key: 'MonthlyQuotes', routeName: 'MonthlyQuotes' },
    ],
    currentQuote: {},
    quotes: [
        {
            name: 'Admiral',
            extras: 14,
            excess: 340,
            annualy: '715.45',
            ID: 'Admiral'
        },{
            name: 'Alianz',
            extras: 14,
            excess: 340,
            annualy: '734.44',
            ID: 'Alianz'
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '736.45',
            ID: 'Aviva'
        },{
            name: '123',
            extras: 14,
            excess: 340,
            annualy: '715.45',
            ID: 'seller123'
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '737.50',
            ID: 'Aviva'
        },{
            name: 'Admiral',
            extras: 14,
            excess: 340,
            annualy: '740.44',
            ID: 'Admiral'
        }
    ]
}

export default (state: any = initState, action: {type: string, payload?:any}) => {
    switch (action.type) {
        case SHOW_ANNUAL_QUOTE_ACTION:
            return Object.assign({}, {...state, currentQuote: action.payload});
        case SHOW_ANNUAL_QUOTES_LIST_ACTION:
            return Object.assign({}, {...state, currentQuote: {}})
        default:
            return Object.assign({}, TabNavigation.router.getStateForAction(action, state));
    }
};