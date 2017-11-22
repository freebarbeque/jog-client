export interface IDocumentsReduxState {
  policyDocuments: IDocument[];
  pendingDocuments: IPendingDocument[];
}

export interface IDocument {
  id?: string;
  name?: string;
}

export interface IPendingDocument {
  file: any;
  pendingId: string;
  name?: string;
}
