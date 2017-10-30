import AnnualQuotes from './components/AnnualQuotes';
import { connect } from "react-redux";
import { SHOW_ANNUAL_QUOTE_ACTION, SHOW_ANNUAL_QUOTES_LIST_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    console.log('state', state.annualQuotes);
    
    return {
        quotes: state.annualQuotes.quotes,
        currentQuote: state.annualQuotes.currentQuote
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showQuote: (quote) => dispatch({type: SHOW_ANNUAL_QUOTE_ACTION, payload: quote}),
        showList: () => dispatch({type: SHOW_ANNUAL_QUOTES_LIST_ACTION})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AnnualQuotes);


