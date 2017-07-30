import styled from 'styled-components'
import { BLUE } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
export default styled.div`
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  padding-bottom: ${MARGIN.large}px;

  p,
  h1,
  h2,
  a,
  span,
  ol,
  ul {
    color: ${BLUE} !important;
  }
`
