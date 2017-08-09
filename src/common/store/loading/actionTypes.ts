export interface IStartLoadingAction {
  type: 'loading/START'
  text: string
}

export interface IFinishLoadingAction {
  type: 'loading/FINISH'
}

export type LoadingAction = IStartLoadingAction | IFinishLoadingAction
