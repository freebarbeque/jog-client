// @flow

export type StartLoadingAction = {
  type: 'loading/START',
  text: string,
}

export type FinishLoadingAction = {
  type: 'loading/FINISH',
}

export type LoadingAction = StartLoadingAction | FinishLoadingAction
