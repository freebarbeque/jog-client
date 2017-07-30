import * as React from 'react'

import { ABOUT_US } from '../../../common/constants/text'
import { BLUE } from '../../../common/constants/palette'
import Container from './Container'

export default props => {
  return (
    <Container {...props}>
      <p style={{ color: BLUE }}>
        {ABOUT_US}
      </p>
    </Container>
  )
}
