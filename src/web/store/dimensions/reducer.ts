import * as $ from 'jquery'
import { IDimensionsReduxState } from '../../../common/types'
import * as actionTypes from './actionTypes'

const DEFAULT_STATE = {
  width: $(window).width() || 0,
  height: $(window).height() || 0,
}

export default function reducer(
  state: IDimensionsReduxState = DEFAULT_STATE,
  action: actionTypes.IUpdateDimensions,
): IDimensionsReduxState {
  if (action.type === 'dimensions/UPDATE_DIMENSIONS') {
    return {
      ...state,
      width: action.width,
      height: action.height,
    }
  }
  return state
}
