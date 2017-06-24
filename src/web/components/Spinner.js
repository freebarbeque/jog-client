import React from 'react'
import { DoubleBounce } from 'better-react-spinkit'
import styled from 'styled-components'
import { BLUE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

// language=SCSS prefix=dummy{ suffix=}
const Text = styled.div`
  color: ${BLUE};
  margin-top: ${MARGIN.large}px;
  text-align: center;
`

// language=SCSS prefix=dummy{ suffix=}
const CentredDoubleBounce = styled(DoubleBounce)`
  margin-left: auto;
  margin-right: auto;
`

export default props =>
  <Wrapper>
    <CentredDoubleBounce color={BLUE} size={60} />
    <Text>
      {props.text}
    </Text>
  </Wrapper>
