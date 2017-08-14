import styled from 'styled-components'
import { PINK } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const SelectBox = styled.button`
  margin-top: ${MARGIN.base}px;
  margin-left: ${MARGIN.base}px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: rgb(240, 240, 240);
  border: none;
  cursor: pointer;
  border-radius: 6px;
  padding-left: 14px;
  padding-right: 14px;
  position: relative;

  &.selected {
    background-color: ${PINK};
    color: white;
    cursor: default;
  }

  &:hover {
    background-color: ${PINK};
    color: white;
  }

  &:focus {
    outline: 0;
  }
`

export default SelectBox
