import AnnualQuotes from './components/AnnualQuotes';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        quotes: state.annualQuotes.quotes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AnnualQuotes);


