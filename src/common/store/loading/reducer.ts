import { LoadingAction } from './actionTypes'

export type LoadingReduxState = {
  loading: boolean
  text: string
}

const DEFAULT_STATE = {
  loading: false,
  text: '',
}

export default function reducer(
  state: LoadingReduxState = DEFAULT_STATE,
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
