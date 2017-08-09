import { IClearErrorAction, IDeclareErrorAction } from './actionTypes'

export function declareError(text: string): IDeclareErrorAction {
  return {
    type: 'errors/DECLARE',
    text,
  }
}

export function clearError(): IClearErrorAction {
  return {
    type: 'errors/CLEAR',
  }
}
