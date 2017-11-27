import {createSelector} from 'reselect';
import {IDocument, IDocumentPreview, IPendingDocument} from '../interfaces/documents';
import {IReduxState} from '../interfaces/store';

export const getPolicyDocuments = (state: IReduxState) => state.documents.policyDocuments;
export const getPendingDocuments = (state: IReduxState) => state.documents.pendingDocuments;
export const getSubmissionError = (state: IReduxState) => state.documents.submissionError;
export const getIsLoading = (state: IReduxState) => state.documents.isLoading;
export const getPreview = (state: IReduxState) => state.documents.preview;

export const getPreviewDocument = createSelector(
    getPreview,
    getPolicyDocuments,
    getPendingDocuments,
    (preview: IDocumentPreview, policyDocs: IDocument[], pendingDocs: IPendingDocument[]) => {
        if (!preview) {
            return;
        }

        if (preview.pending) {
            return pendingDocs[preview.index];
        } else {
            return policyDocs[preview.index];
        }
    }
)