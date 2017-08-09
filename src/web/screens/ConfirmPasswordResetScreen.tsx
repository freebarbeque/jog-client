import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { MARGIN } from '../../common/constants/style'
import { Dispatch } from '../../common/types'
import HorizontalFlexCenteredContainer from '../components/HorizontalFlexCenteredContainer'
import RoundedButton from '../components/RoundedButton'
import Title from '../components/Title'

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 300;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

class ConfirmPasswordResetScreen extends React.Component<DispatchProp<any>> {
  public render() {
    return (
      <HorizontalFlexCenteredContainer>
        <Title>Password Reset</Title>
        <Description>
          We just sent you an email through which you can reset your password.
        </Description>
        <RoundedButton
          style={{
            marginTop: MARGIN.extraLarge,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          label={'Back'}
          onClick={this.goBack}
        />
      </HorizontalFlexCenteredContainer>
    )
  }

  private goBack = () => {
    this.props.dispatch(push('/auth'))
  }
}

export default connect()(ConfirmPasswordResetScreen)
