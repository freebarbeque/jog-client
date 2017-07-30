import * as React from 'react'
import styled from 'styled-components'
import { PINK, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

const Circle = require('better-react-spinkit')

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  background-color: ${PINK};
  width: 120px;
  height: 40px;
  display: flex;
  border-radius: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.7;
  }
`

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  loading?: boolean
  disabled?: boolean
}

const RoundedButton = (props: Props) =>
  <Button disabled={props.loading || props.disabled} {...props}>
    <div>
      {props.label}
    </div>
    {props.loading &&
      <div style={{ marginLeft: MARGIN.small }}>
        <Circle size={15} color={WHITE} />
      </div>}
  </Button>

export default RoundedButton
