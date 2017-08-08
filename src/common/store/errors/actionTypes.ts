export interface DeclareErrorAction {
  type: 'errors/DECLARE'
  text: string
}

export interface ClearErrorAction {
  type: 'errors/CLEAR'
}

export type ErrorAction = DeclareErrorAction | ClearErrorAction
