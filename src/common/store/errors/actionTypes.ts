export interface IDeclareErrorAction {
  type: 'errors/DECLARE'
  text: string
}

export interface IClearErrorAction {
  type: 'errors/CLEAR'
}

export type ErrorAction = IDeclareErrorAction | IClearErrorAction
