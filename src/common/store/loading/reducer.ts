import { LoadingAction } from './actionTypes'

export interface ILoadingReduxState {
  loading: boolean
  text: string
}

const DEFAULT_STATE = {
  loading: false,
  text: '',
}

export default function reducer(
  state: ILoadingReduxState = DEFAULT_STATE,
  action: LoadingAction,
) {
  if (action.type === 'loading/START') {
    return {
      loading: true,
      text: action.text,
    }
  } else if (action.type === 'loading/FINISH') {
    return {
      loading: false,
      text: '',
    }
  }
  return state
}
