import { connect } from "react-redux";
import CarQuestions from "./components/CarQuestions";
import { compose, withPropsOnChange } from 'recompose';
import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    return {
        questions: state.carQuestions.questions,
        currentQuestionNumber: state.carQuestions.currentQuestion
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onNextQuestion: (args) => {
            return dispatch({type: SHOW_NEXT_QUESTION_ACTION})
        },
        onPrevQuestion: (args) => {
            return dispatch({type: SHOW_PREV_QUESTION_ACTION})
        },
        answerOnChange: (answer, questionNumber) => {
            return dispatch({type: CAR_SET_ANSWER_ACTION, payload: {answer, questionNumber}});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarQuestions)


