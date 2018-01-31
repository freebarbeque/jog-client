import {createSelector} from 'reselect';
import {IDocument, IDocumentPreview, IPendingDocument} from '../interfaces/documents';
import {IReduxState} from '../interfaces/store';

export const getPolicyDocuments = (state: IReduxState) => state.documents.policyDocuments;
export const getPendingDocuments = (state: IReduxState) => state.documents.pendingDocuments;
export const getSubmissionError = (state: IReduxState) => state.documents.submissionError;
export const getIsLoading = (state: IReduxState) => state.documents.isLoading;
export const getIsUploading = (state: IReduxState) => state.documents.isUploading;
export const getPreview = (state: IReduxState) => state.documents.preview;
export const getIsPreviewLoading = (state: IReduxState) => state.documents.isPreviewLoading;

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

export const getDocumentsForPolicy = createSelector(
    getPolicyDocuments,
    (state: any, policyId: string) => policyId,
    (documents: any, policyId: string) => documents.filter(doc => doc.documentable_id === Number(policyId))
);
