import {createSelector} from 'reselect';
import {IDocument, IPendingDocument} from '../interfaces/documents';
import {IReduxState} from '../interfaces/store';

export const getPolicyDocuments = (state: IReduxState) => state.documents.policyDocuments;
export const getPendingDocuments = (state: IReduxState) => state.documents.pendingDocuments;
export const getSubmissionError = (state: IReduxState) => state.documents.submissionError;
export const getIsLoading = (state: IReduxState) => state.documents.isLoading;