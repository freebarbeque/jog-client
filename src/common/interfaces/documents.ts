export interface IDocumentsReduxState {
  policyDocuments: IDocument[];
}

export interface IDocument {
  id?: string;
  name?: string;
}
