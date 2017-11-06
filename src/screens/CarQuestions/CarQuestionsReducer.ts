import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION } from '../../cfg/actions';

const initialState = {
    currentQuestion: 0,
    questions: [
        {
            question: 'What is your policy number?',
            answer: ''
        },{
            question: 'How much does your policy cost per year?',
            answer: ''
        },{
            question: 'Is the car the same as you currently have?',
            answer: ''
        },{
            question: 'What is the license plate number?',
            answer: ''
        },{
            question: 'Has the car been modified in anyway?',
            answer: ''
        },{
            question: 'Roughly how much do you think the car is worth?',
            answer: ''
        },{
            question: 'How many cars are there in your household?',
            answer: ''
        }
    ]
};

export default (state = initialState, action:any={}) => {
    switch (action.type) {
        case SHOW_NEXT_QUESTION_ACTION:
            return Object.assign({}, {...state, currentQuestion: state.currentQuestion + 1});

        case SHOW_PREV_QUESTION_ACTION:
            return Object.assign({}, {...state, currentQuestion: state.currentQuestion - 1});

        case CAR_SET_ANSWER_ACTION:
            return setCarQuestion(state, action.payload)

        default:
            return state;
    }
};

const setCarQuestion = (state, payload) => {
    const questions = state.questions.slice(0);
    questions[payload.questionNumber].answer = payload.answer;
    return Object.assign({}, {...state, questions: questions});
}
