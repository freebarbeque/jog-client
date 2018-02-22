import { SET_CURRENT_USER } from './constants'

const initialState = {
    currentUser: null,
};

export default function(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload.user,
            };

        default:
            return state
    }
}
