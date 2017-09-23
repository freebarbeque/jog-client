import styled from 'styled-components'
import { BLUE } from '../../common/constants/palette'

export const QuestionsScreenHeader = styled.h2`
  height: 40px;
  background-color: rgb(236, 236, 236);
  font-size: 20px;
  font-weight: 600;
  color: ${BLUE};
  margin: 0;
  > div {
    display: flex;
    align-items: center;
  }
`
