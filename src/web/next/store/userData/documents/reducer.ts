import {
    DOCUMENT_REMOVE,
    DOCUMENTS_ADD,
    DOCUMENTS_FETCH_STARTED,
    DOCUMENTS_FETCH_FINISHED,
    DOCUMENTS_FETCH_FAILED,
} from './constants';

import createFragment from '../../handlers/createFragment';

const DOCUMENT = createFragment('document');

const initialState = {
    isLoading: false,
    error: null,
    documents: null,
    collection: new Set(),
};

export default function createReducer(state: any = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case DOCUMENTS_FETCH_STARTED:
            return {
                ...state,
                isLoading: true,
            };

        case DOCUMENTS_FETCH_FAILED:
            return {
                ...state,
                error: payload.error,
                isLoading: false,
            };

        case DOCUMENTS_FETCH_FINISHED:
            return {
                ...state,
                documents: {
                    ...state.documents,
                    ...payload.documents.reduce((fragment, document) => {
                        fragment[document.id] = DOCUMENT.fetched(document);
                        return fragment;
                    }, {})
                },
                collection: new Set([...Array.from(state.collection), ...payload.documents.map(p => p.id)]),
                isLoading: false,
            };

        case DOCUMENTS_ADD:
            return {
                ...state,
                collection: new Set([...Array.from(state.collection), ...payload.documents.map(d => d.id)]),
                documents: {
                    ...state.documents,
                    ...payload.documents.reduce((fragment, document) => {
                        fragment[document.id] = DOCUMENT.fetched(document);
                        return fragment;
                    }, {})
                }
            };

        case DOCUMENT_REMOVE:
            delete state.documents[payload.documentId];
            state.collection.delete(payload.documentId);

            return { ...state };

        default:
            return state;
    }
}
