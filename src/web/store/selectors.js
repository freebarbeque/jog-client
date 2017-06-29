// @flow

import { createSelector } from 'reselect'
import type { ReduxState } from '../../common/types'
import { breakpoints } from '../media'

export const isHandset: () => boolean = createSelector(
  (state: ReduxState) => state.dimensions.width,
  (width: number) => {
    return width <= breakpoints.extraLargeHandset
  },
)
