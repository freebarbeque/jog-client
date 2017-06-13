import styled from 'styled-components'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
export default styled.input`
  margin-top: ${MARGIN.base}px;
  height: 50px;
  background-color: white;
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  font-size: 20px;
  border-radius: 4px;
  border: 2px solid transparent;
`
