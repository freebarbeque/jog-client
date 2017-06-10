/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import type { Dispatch } from 'jog/src/common/types'
import { MARGIN } from '../../common/constants/style'
import RoundedButton from '../components/RoundedButton'

type ConfirmPasswordResetScreenProps = {
  dispatch: Dispatch,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
    flex: 1;
    display: flex;
    padding-top: 20px;
    flex-direction: column;
`

// language=SCSS prefix=dummy{ suffix=}
const Title = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: ${MARGIN.large}px;
  font-weight: 400;
  color: white;
`

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 300;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

class ConfirmPasswordResetScreen extends Component {
  props: ConfirmPasswordResetScreenProps

  goBack = () => {
    this.props.dispatch(push('/auth'))
  }

  render() {
    return (
      <Container>
        <Title>
          Password Reset
        </Title>
        <Description>
          We just sent you an email through which you can reset your
          password.
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
      </Container>
    )
  }
}

export default connect()(ConfirmPasswordResetScreen)
