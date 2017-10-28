import { connect } from "react-redux";
import Quote from "./components/Quote";
import { compose } from 'recompose';
import { GOTO_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    return {
        carQuestions: state.carQuestions.questions,
        quoteSections: state.quote.quoteSections
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goTo: (route) => dispatch({type: GOTO_ACTION, payload: route})
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Quote);