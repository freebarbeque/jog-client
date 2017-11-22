import {ADD_PENDING_DOCUMENTS, REMOVE_PENDING_DOCUMENT} from 'src/common/constants/documents';

export const addPendingDocuments = (documents: any[]) => ({
  type: ADD_PENDING_DOCUMENTS,
  documents,
});

export const removePendingDocument = (documentIndex: number) => ({
  type: REMOVE_PENDING_DOCUMENT,
  documentIndex,
});