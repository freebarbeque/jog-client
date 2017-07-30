import { createSelector } from 'reselect'
import { ReduxState } from '../../common/types'
import { breakpoints } from '../media'

export const isHandset = createSelector(
  (state: ReduxState) => state.dimensions.width,
  (width: number) => {
    return width <= breakpoints.extraLargeHandset
  },
)
