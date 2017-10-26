import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION } from '../../cfg/actions';

const initialState = {
    quoteSections: [
        {
            title: 'Car',
            percent: 30,
            questions: 6,
            route: 'CarQuestions',
            
        },{
            title: 'Driver',
            percent: 100,
            questions: 0,
            route: null
        },{
            title: 'Usage',
            percent: 50,
            questions: 6,
            route: null
        }
    ]
};

export default (state = initialState, action:any={}) => {
    
    switch (action.type) {

        default:
            return state;
    }
};