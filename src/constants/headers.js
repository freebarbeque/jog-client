import React from 'react'
import { Logo } from 'jog/src/components/images'
import { MARGIN } from './style'
import { BLUE } from './palette'

export const authNavigationHeader = {
  title: null,
  left: (
    <Logo
      style={{ marginLeft: MARGIN.large, marginBottom: MARGIN.base }}
      scale={1}
    />
  ),
  style: { backgroundColor: BLUE }
}
