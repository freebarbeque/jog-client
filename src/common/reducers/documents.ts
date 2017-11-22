import {IDocumentsReduxState} from '../interfaces/documents';
import {IAction} from '../interfaces/action';
import {ADD_PENDING_DOCUMENTS, REMOVE_PENDING_DOCUMENT} from 'src/common/constants/documents';

const defaultState = {
  policyDocuments: [],
};

export default function (state: IDocumentsReduxState = defaultState, action: IAction) {
  switch (action.type) {

    case ADD_PENDING_DOCUMENTS:
      return Object.assign({}, state, {policyDocuments: state.policyDocuments.concat(action.documents)});

    case REMOVE_PENDING_DOCUMENT:
      return Object.assign({}, state, {policyDocuments: state.policyDocuments.filter((d, i) => i !== action.documentIndex)});

    default: {
      return state;
    }
  }
}