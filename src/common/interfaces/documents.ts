export interface IDocumentsReduxState {
  policyDocuments: IDocument[];
  pendingDocuments: IPendingDocument[];
  submissionError: Error|null;
  isLoading: boolean;
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
