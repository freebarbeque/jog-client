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
            ID: 'Admiral',
            monthly: {
                price: '30.45',
                excess: '30.45',
                upfront: '30.45'
            }
        },{
            name: 'Alianz',
            extras: 14,
            excess: 340,
            annualy: '734.44',
            ID: 'Alianz',
            monthly: {
                price: '33.45',
                excess: '33.45',
                upfront: '33.45'
            }
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '736.45',
            ID: 'Aviva',
            monthly: {
                price: '35.45',
                excess: '30.45',
                upfront: '30.45'
            }
        },{
            name: '123',
            extras: 14,
            excess: 340,
            annualy: '715.45',
            ID: 'seller123',
            monthly: {
                price: '36.45',
                excess: '30.45',
                upfront: '30.45'
            }
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '737.50',
            ID: 'Aviva',
            monthly: {
                price: '37.45',
                excess: '30.45',
                upfront: '30.45'
            }
        },{
            name: 'Admiral',
            extras: 14,
            excess: 340,
            annualy: '740.44',
            ID: 'Admiral',
            monthly: {
                price: '38.45',
                excess: '30.45',
                upfront: '30.45'
            }
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