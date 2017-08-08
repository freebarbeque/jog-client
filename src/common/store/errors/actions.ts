import { ClearErrorAction, DeclareErrorAction } from './actionTypes'

export function declareError(text: string): DeclareErrorAction {
  return {
    type: 'errors/DECLARE',
    text,
  }
}

export function clearError(): ClearErrorAction {
  return {
    type: 'errors/CLEAR',
  }
}
