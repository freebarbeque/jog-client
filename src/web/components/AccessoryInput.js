import React from 'react'
import styled from 'styled-components'
import { MARGIN } from '../../common/constants/style'
import { BLUE } from '../../common/constants/palette'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  height: 50px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
`

// language=SCSS prefix=dummy{ suffix=}
const AccessoryContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${BLUE};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  border-right-width: 1px;
  border-right-color: ${BLUE};
  border-right-style: solid;
`

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  border: none;
  color: ${BLUE};
  flex: 1;
  font-size: 20px;
  border-radius: 4px;
`
export default props =>
  <Container>
    <AccessoryContainer>
      {props.accessory}
    </AccessoryContainer>
    <Input {...props} />
  </Container>
