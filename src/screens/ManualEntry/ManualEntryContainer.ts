import { connect } from "react-redux";
import ManualEntry from "./components/ManualEntry";
import {MANUAL_NEXT_QUESTION_ACTION, MANUAL_PREV_QUESTION_ACTION} from '../../cfg/actions'

const mapStateToProps = (state) => {
    return {
        questions: state.manualEntry.questions,
        currentQuestionNumber: state.manualEntry.currentQuestion
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNextQuestion: (args) => {
            return dispatch({type: MANUAL_NEXT_QUESTION_ACTION})
        },
        onPrevQuestion: (args) => {
            return dispatch({type: MANUAL_PREV_QUESTION_ACTION})
        },
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ManualEntry)
