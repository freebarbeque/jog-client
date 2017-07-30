import * as React from 'react'
import styled from 'styled-components'
import { MARGIN } from '../../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(200, 200, 200);
  margin-top: ${MARGIN.base}px;
`

export default props => {
  return (
    <div
      style={{
        color: 'rgb(200, 200, 200)',
        fontSize: 18,
        marginBottom: MARGIN.extraLarge,
      }}
    >
      {props.children}
      <HR />
    </div>
  )
}
