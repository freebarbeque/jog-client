import { connect } from "react-redux";
import YourQuotes from './components/YourQuotes';
import { compose } from 'recompose';


const mapStateToProps = (state) => {  
    return {
        localState: state.yourQuotes,
        activeTab: state.yourQuotes.index === 0 ? 'AnnualQuotes' : 'MonthlyQuotes'
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps)(YourQuotes);



