import React from 'react'
import { COOKIES_POLICY } from '../../../common/constants/text'

export default props =>
  <div {...props}>
    <p>
      {COOKIES_POLICY}
    </p>
  </div>
