import * as React from 'react'
import { COOKIES_POLICY } from '../../../common/constants/text'
import { BLUE } from '../../../common/constants/palette'
import Container from './Container'

export default props =>
  <Container {...props}>
    <p style={{ color: BLUE }}>
      {COOKIES_POLICY}
    </p>
  </Container>
