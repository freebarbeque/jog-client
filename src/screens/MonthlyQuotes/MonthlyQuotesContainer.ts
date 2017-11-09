import MonthlyQuotes from './components/MontlyQuotes';
import { connect } from 'react-redux';
import { SHOW_ANNUAL_QUOTE_ACTION, SHOW_ANNUAL_QUOTES_LIST_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    return {
        quotes: state.yourQuotes.quotes,
        currentQuote: state.yourQuotes.currentQuote
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showQuote: (quote) => dispatch({type: SHOW_ANNUAL_QUOTE_ACTION, payload: quote}),
        showList: () => dispatch({type: SHOW_ANNUAL_QUOTES_LIST_ACTION})
    }
};
const MonthlyQuotesContainer: any = connect(mapStateToProps, mapDispatchToProps)(MonthlyQuotes);

export default MonthlyQuotesContainer;