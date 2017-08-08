export interface StartLoadingAction {
  type: 'loading/START'
  text: string
}

export interface FinishLoadingAction {
  type: 'loading/FINISH'
}

export type LoadingAction = StartLoadingAction | FinishLoadingAction
