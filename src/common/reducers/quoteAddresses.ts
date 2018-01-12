import {
    SET_ADDRESSES,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    UPDATE_ADDRESS,
    SET_LOADING_STATE,
    SET_POSSIBLE_ADDRESSES,
} from '../constants/quoteAddress';

const initialState = {
    isLoading: false,
    addresses: [],
    possibleAddresses: [],
};

export default function (state: any = initialState, action: any) {
    switch (action.type) {
        case SET_POSSIBLE_ADDRESSES:
            return {
                ...state,
                possibleAddresses: action.possibleAddresses,
            };

        case SET_ADDRESSES:
            return {
                ...state,
                addresses: action.addresses,
            };

        case ADD_ADDRESS:
            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    ...action.address,
                ]
            };

        case REMOVE_ADDRESS:
            const removeIndex = state.addresses.findIndex(a => a.id === +action.id);
            if (removeIndex >= 0) {
                return {
                    ...state,
                    addresses: [
                        ...state.addresses.slice(0, removeIndex),
                        ...state.addresses.slice(removeIndex + 1),
                    ]
                };
            }
            return state;

        case UPDATE_ADDRESS:
            const updateIndex = state.addresses.findIndex(a => a.id === +action.id);

            return {
                ...state,
                addresses: [
                    ...state.addresses.slice(0, updateIndex),
                    { id: action.id, ...action.address },
                    ...state.addresses.slice(updateIndex + 1),
                ]
            };

        case SET_LOADING_STATE:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        default:
            return state
    }
}
