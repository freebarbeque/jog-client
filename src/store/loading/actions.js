// @flow

import type { FinishLoadingAction, StartLoadingAction } from './actionTypes'

export function startLoading(text: string) : StartLoadingAction {
  return {
    type: 'loading/START',
    text
  }
}


export function finishLoading() : FinishLoadingAction {
  return {
    type: 'loading/FINISH',
  }
}
