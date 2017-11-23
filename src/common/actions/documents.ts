import {
    ADD_PENDING_DOCUMENTS,
    REMOVE_PENDING_DOCUMENT,
    UPLOAD_PENDING_DOCUMENTS,
} from '../constants/documents';

export const addPendingDocuments = (documents: any[]) => ({
    type: ADD_PENDING_DOCUMENTS,
    documents,
});

export const removePendingDocument = (documentId: string) => ({
    type: REMOVE_PENDING_DOCUMENT,
    documentId,
});

export function uploadPendingDocuments() {
    return {
        type: UPLOAD_PENDING_DOCUMENTS,
    }
}