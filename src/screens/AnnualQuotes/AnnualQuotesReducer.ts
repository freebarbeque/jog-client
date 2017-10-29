import { SHOW_NEXT_QUESTION_ACTION, SHOW_PREV_QUESTION_ACTION, CAR_SET_ANSWER_ACTION } from '../../cfg/actions';

const initialState = {
    quotes: [
        {
            name: 'Admiral',
            extras: 14,
            excess: 340,
            annualy: '715.45',
            ID: 'Admiral'
        },{
            name: 'Alianz',
            extras: 14,
            excess: 340,
            annualy: '734.44',
            ID: 'Alianz'
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '736.45',
            ID: 'Aviva'
        },{
            name: '123',
            extras: 14,
            excess: 340,
            annualy: '715.45',
            ID: 'seller123'
        },{
            name: 'Aviva',
            extras: 14,
            excess: 340,
            annualy: '737.50',
            ID: 'Aviva'
        },{
            name: 'Admiral',
            extras: 14,
            excess: 340,
            annualy: '740.44',
            ID: 'Admiral'
        }
    ]
};

export default (state = initialState, action:any={}) => {
    
    switch (action.type) {
        

        default:
            return state;
    }
};