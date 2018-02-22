import { merge } from 'lodash';

const initialState = {
    motor_policies: {},
    drivers: {},
    vehicles: {},
    addresses: {},
    documents: {},
};

export default function createEntitiesReducer(state: any = initialState, action: any) {
    if (action.entities) {
        return merge({}, state, action.entities)
    }

    return state
};
