import { MANUAL_PREV_QUESTION_ACTION, MANUAL_NEXT_QUESTION_ACTION } from '../../cfg/actions';

const initialState = {
    currentQuestion: 0,
    questions: [
        {
            question: 'Who is your insurer?',
            answer: '',
            ID: 'insurer'
        },{
            question: 'What is your policy number?',
            answer: '',
            ID: 'pol_number'
        },{
            question: 'What date does the policy expire?',
            answer: '',
            ID: 'expire_date'
        },{
            question: 'What does your policy cost per year?',
            answer: '',
            ID: 'year_cost'
        },{
            question: 'What is your license plate No.?',
            answer: '',
            ID: 'plate_no'
        },{
            question: 'Is your vehicle:',
            answer: '',
            ID: 'your_vehicle'
        },{
            question: 'Done',
            answer: '',
            ID: 'done'
        }
        
    ]
};

export default (state = initialState, action:any={}) => {
    
    switch (action.type) {
        
        case MANUAL_NEXT_QUESTION_ACTION:
            return Object.assign({}, {...state, currentQuestion: state.currentQuestion + 1});
        
        case MANUAL_PREV_QUESTION_ACTION: 
        console.log('MANUAL_PREV_QUESTION_ACTION');
        
            return Object.assign({}, {...state, currentQuestion: state.currentQuestion - 1});

        default:
            return state;
    }
};