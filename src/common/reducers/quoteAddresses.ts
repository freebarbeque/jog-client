import {
    SET_ADDRESSES,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    UPDATE_ADDRESS,
    SET_LOADING_STATE,
} from '../constants/quoteAddresses';

const initialState = {
    isLoading: false,
    addresses: [],
};

export default function createQuoteAddressesReducer() {
    return (state: any = [], action) => {
        switch (action.type) {
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
                        { id: action.id, ...action.address }
                    ]
                };

            case REMOVE_ADDRESS:
                const removeIndex = state.findIndex(a => a.id === action.id)
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
                const updateIndex = state.findIndex(a => a.id === action.id)
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
}
