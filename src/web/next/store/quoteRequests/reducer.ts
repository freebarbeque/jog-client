import { UPDATE_QUOTE_REQUEST_FRAGMENT } from './constants';

const initialState = {
    quoteRequests: {},
};

export default function createReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_QUOTE_REQUEST_FRAGMENT:
            const currentQuoteRequest = state.quoteRequests[payload.quoteRequestId];

            return {
                ...state,
                quoteRequests: {
                    ...state.quoteRequests,
                    [payload.quoteRequestId]: quoteRequestHandler({
                        ...currentQuoteRequest,
                        ...payload.fragment,
                    })
                }
            };

        default:
            return state;
    }
}

function quoteRequestHandler(overrides?: any) {
    const defaultQuoteRequest = {
        drivers: [],
        vehicle: null,
        address: null,
        startDate: '',
    };

    return {
        ...defaultQuoteRequest,
        ...overrides,
    }
}
