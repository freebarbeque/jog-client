import {IDocumentsReduxState} from '../interfaces/documents';
import {IAction} from '../interfaces/action';
import {
    ADD_PENDING_DOCUMENTS,
    REMOVE_PENDING_DOCUMENT,
    SET_DOCUMENT_SUBMISSION_ERROR,
    SET_IS_LOADING,
    SET_DOCUMENTS, CLEAR_PENDING_DOCUMENTS,
} from '../constants/documents';

const defaultState = {
    policyDocuments: [],
    pendingDocuments: [],
    submissionError: null,
    isLoading: false,
};

export default function (state: IDocumentsReduxState = defaultState, action: IAction) {
    switch (action.type) {

        case ADD_PENDING_DOCUMENTS:
            return Object.assign({}, state, {pendingDocuments: state.pendingDocuments.concat(action.documents)});

        case CLEAR_PENDING_DOCUMENTS: {
            return {
                ...state,
                pendingDocuments: [],
            }
        }

        case REMOVE_PENDING_DOCUMENT:
            return Object.assign({}, state, {pendingDocuments: state.pendingDocuments.filter(d => d.pendingId !== action.documentId)});

        case SET_DOCUMENT_SUBMISSION_ERROR:
            return {
                ...state,
                submissionError: action.error,
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            }

        case SET_DOCUMENTS: {
            return {
                ...state,
                policyDocuments: action.documents,
            }
        }

        default: {
            return state;
        }
    }
}