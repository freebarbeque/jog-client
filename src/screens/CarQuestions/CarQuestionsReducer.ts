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
            question: 'Question number 3',
            answer: ''
        },{
            question: 'Question number 4',
            answer: ''
        },{
            question: 'Question number 5',
            answer: ''
        },{
            question: 'Question number 6',
            answer: ''
        },{
            question: 'Question number 7',
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