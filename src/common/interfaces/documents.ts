export interface IDocumentsReduxState {
  policyDocuments: IDocument[];
  pendingDocuments: IPendingDocument[];
  submissionError: Error|null;
  isLoading: boolean;
  preview: IDocumentPreview|null;
  isPreviewLoading: boolean;
}

export interface IDocument {
  id?: string;
  attachment: {
    url: string;
  }
}

export interface IPendingDocument {
  file: any;
  pendingId: string;
  name?: string;
}

export interface IDocumentPreview {
  index: number;
  pending: boolean;
}
