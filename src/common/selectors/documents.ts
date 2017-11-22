import {createSelector} from 'reselect';
import {IDocument, IPendingDocument} from 'src/common/interfaces/documents';

export const getPolicyDocuments = (state: any) => state.documents.policyDocuments;
export const getPendingDocuments = (state: any) => state.documents.pendingDocuments;