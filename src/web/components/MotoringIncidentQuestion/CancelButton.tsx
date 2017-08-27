import styled from 'styled-components'

import { BLUE } from '~/common/constants/palette'

export default styled.a`
  text-decoration: underline !important;
  color: ${BLUE} !important;
  cursor: pointer;
  display: block;

  &:hover {
    color: ${BLUE} !important;
    text-decoration: none !important;
  }
`
