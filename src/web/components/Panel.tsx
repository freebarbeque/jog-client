import styled from 'styled-components'
import { BLUE, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
export default styled.div.attrs({ className: 'Panel' })`
  background-color: ${WHITE};
  margin-top: ${MARGIN.base}px;
  margin-bottom: ${MARGIN.base}px;
  padding: ${MARGIN.large}px;

  h3 {
    color: ${BLUE};
    margin-top: 0;
    padding-top: 0;
  }
  
  .QuestionSet {
    > div {
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
  }
`
