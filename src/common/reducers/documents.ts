import {IDocumentsReduxState} from '../interfaces/documents';
import {IAction} from '../interfaces/action';
import {ADD_PENDING_DOCUMENTS, REMOVE_PENDING_DOCUMENT} from '../constants/documents';

const defaultState = {
  policyDocuments: [],
  pendingDocuments: [],
};

export default function (state: IDocumentsReduxState = defaultState, action: IAction) {
  switch (action.type) {

    case ADD_PENDING_DOCUMENTS:
      return Object.assign({}, state, {pendingDocuments: state.pendingDocuments.concat(action.documents)});

    case REMOVE_PENDING_DOCUMENT:
      return Object.assign({}, state, {pendingDocuments: state.pendingDocuments.filter(d => d.pendingId !== action.documentId)});

    default: {
      return state;
    }
  }
}