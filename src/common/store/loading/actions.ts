import { IFinishLoadingAction, IStartLoadingAction } from './actionTypes'

export function startLoading(text: string): IStartLoadingAction {
  return {
    type: 'loading/START',
    text,
  }
}

export function finishLoading(): IFinishLoadingAction {
  return {
    type: 'loading/FINISH',
  }
}
