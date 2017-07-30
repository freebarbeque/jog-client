import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { Dispatch } from '../../common/types'
import { MARGIN } from '../../common/constants/style'
import RoundedButton from '../components/RoundedButton'
import HorizontalFlexCenteredContainer from '../components/HorizontalFlexCenteredContainer'
import Title from '../components/Title'

interface ConfirmPasswordResetScreenProps extends DispatchProp<any> {}

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 300;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

class ConfirmPasswordResetScreen extends React.Component<
  ConfirmPasswordResetScreenProps
> {
  goBack = () => {
    this.props.dispatch(push('/auth'))
  }

  render() {
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
}

export default connect()(ConfirmPasswordResetScreen)
