import { connect } from "react-redux";
import GettingQuotes from "./components/GettingQuotes";
import { compose, withPropsOnChange } from 'recompose';
import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GettingQuotes)


