import { createSelector } from 'reselect'
import { IReduxState } from '../../common/types'
import { breakpoints } from '../media'

export const isHandset = createSelector(
  (state: IReduxState) => state.dimensions.width,
  (width: number) => {
    return width <= breakpoints.extraLargeHandset
  },
)
