import styled from 'styled-components'
import { MARGIN } from '../../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const SelectBox = styled.button`
  margin-top: ${MARGIN.base}px;
  margin-left: ${MARGIN.base}px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background-color: rgb(236, 236, 236);
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  padding-left: 14px;
  padding-right: 14px;
  position: relative;
  color: rgba(19, 41, 61, 0.39);
  font-family: "Work Sans";
  font-weight: 500;
  width: 220px;

  &.selected {
    color: #192142;
    box-shadow: 0 4px 4px 0 rgba(51, 51, 51, 0.25);
    border-color: rgb(76, 236, 194);
    border-width: 2px;
    border-style: solid;
    cursor: default;
    font-weight: 500;
  }

  &:hover {
    border-color: rgb(76, 236, 194);
    border-width: 2px;
    border-style: solid;
    font-weight: 500;
  }

  &:focus {
    outline: 0;
  }
`

export default SelectBox
