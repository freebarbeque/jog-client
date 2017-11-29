import {IDocument, IPendingDocument} from '../interfaces/documents';
import {
    SET_DOCUMENTS,
    REMOVE_DOCUMENT,
    REMOVE_DOCUMENT_LOCALLY,
    ADD_PENDING_DOCUMENTS,
    REMOVE_PENDING_DOCUMENT,
    UPLOAD_PENDING_DOCUMENTS,
    SET_DOCUMENT_SUBMISSION_ERROR,
    SET_IS_LOADING,
    CLEAR_PENDING_DOCUMENTS,
    SET_PREVIEW,
    CLEAR_PREVIEW,
    SET_DOCUMENT_FILE,
    SET_IS_PREVIEW_LOADING, SET_IS_UPLOADING,
} from '../constants/documents';

export const setDocuments = (documents: IDocument[]) => {
    return {
        type: SET_DOCUMENTS,
        documents,
    }
}

export const removeDocument = (documentId: number) => {
    return {
        type: REMOVE_DOCUMENT,
        documentId,
    }
}

export const removeDocumentLocally = (documentId: number) => {
    return {
        type: REMOVE_DOCUMENT_LOCALLY,
        documentId,
    }
}

export const addPendingDocuments = (documents: IPendingDocument[]) => ({
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

export function setDocumentSubmissionError(error: Error|null) {
    return {
        type: SET_DOCUMENT_SUBMISSION_ERROR,
        error,
    }
}

export function setIsLoading(isLoading: boolean) {
    return {
        type: SET_IS_LOADING,
        isLoading,
    }
}

export function setIsUploading(isUploading: boolean) {
    return {
        type: SET_IS_UPLOADING,
        isUploading,
    }
}

export function clearPendingDocuments() {
    return {
        type: CLEAR_PENDING_DOCUMENTS,
    }
}

export function setPreview(index: number, pending: boolean) {
    return {
        type: SET_PREVIEW,
        index,
        pending,
    }
}

export function clearPreview() {
    return {
        type: CLEAR_PREVIEW,
    }
}

export function setDocumentFile(id: number, data: ArrayBuffer) {
    return {
        type: SET_DOCUMENT_FILE,
        id,
        file: {
            data,
        }
    }
}

export function setIsPreviewLoading(isLoading: boolean) {
    return {
        type: SET_IS_PREVIEW_LOADING,
        isLoading,
    }
}