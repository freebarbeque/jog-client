import styled from 'styled-components'
import { BLUE } from '../../../../common/constants/palette'

// language=SCSS prefix=dummy{ suffix=}
const Number = styled.div`
  height: 34px;
  width: 34px;
  border-radius: 34px;
  border-color: ${BLUE};
  border-style: solid;
  border-width: 1.5px;
  color: ${BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 300;
`

export default Number
