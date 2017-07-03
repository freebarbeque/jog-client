import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Circle } from 'better-react-spinkit'
import { PINK, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

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
`
const RoundedButton = ({ label, loading, ...props }) =>
  <Button disabled={loading} {...props}>
    <div>
      {label}
    </div>
    {loading &&
      <div style={{ marginLeft: MARGIN.small }}>
        <Circle size={15} color={WHITE} />
      </div>}
  </Button>

RoundedButton.propTypes = {
  label: PropTypes.string,
}

export default RoundedButton
