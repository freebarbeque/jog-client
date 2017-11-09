import { connect } from 'react-redux';
import CarQuestions from './components/CarQuestions';
import { compose, withPropsOnChange } from 'recompose';
import { getCarCompletedPercent } from '../Quote/QuoteContainer';
import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION, GOTO_ACTION } from '../../cfg/actions';

const mapStateToProps = (state) => {
    return {
        questions: state.carQuestions.questions,
        currentQuestionNumber: state.carQuestions.currentQuestion,
        carCompletedPercent: getCarCompletedPercent(state.carQuestions.questions)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onNextQuestion: (currentPercent) => currentPercent < 100 ? dispatch({type: SHOW_NEXT_QUESTION_ACTION}) : dispatch({type: GOTO_ACTION, payload: 'PolicyInfo'}),
        onPrevQuestion: (currentPercent) => dispatch({type: SHOW_PREV_QUESTION_ACTION}),
        answerOnChange: (answer, questionNumber) => {
            return dispatch({type: CAR_SET_ANSWER_ACTION, payload: {answer, questionNumber}});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CarQuestions)
