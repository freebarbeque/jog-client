import * as $ from 'jquery'
import * as actionTypes from './actionTypes'
import { DimensionsReduxState } from '../../../common/types'

const DEFAULT_STATE = { width: $(window).width(), height: $(window).height() }

export default function reducer(
  state: DimensionsReduxState = DEFAULT_STATE,
  action: actionTypes.UpdateDimensions,
): DimensionsReduxState {
  if (action.type === 'dimensions/UPDATE_DIMENSIONS') {
    return {
      ...state,
      width: action.width,
      height: action.height,
    }
  }
  return state
}
