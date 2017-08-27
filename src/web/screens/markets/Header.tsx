import * as React from 'react'
import { BLUE } from '~/common/constants/palette'

export default props => {
  return (
    <h1 style={{ color: BLUE }}>
      {props.children}
    </h1>
  )
}
