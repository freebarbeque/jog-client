/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import type { Dispatch, ReduxState, FirebaseUser } from '../../common/types'
import {
  pollRefreshUser,
  stopPollingRefreshUser,
} from '../../common/store/auth/actions'
import { emailVerification } from '../../common/store/screens/auth/actions'
import { BLUE, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import RoundedButton from '../components/RoundedButton'

type EmailVerificationScreenProps = {
  dispatch: Dispatch,
  user: FirebaseUser | null,
  loading: boolean,
}

class EmailVerificationScreen extends Component {
  props: EmailVerificationScreenProps

  componentDidMount() {
    this.props.dispatch(pollRefreshUser())
  }

  componentWillReceiveProps(props: EmailVerificationScreenProps) {
    const user = props.user
    if (user && user.emailVerified) {
      this.hideModal()
    }
  }

  componentWillUnmount() {
    this.props.dispatch(stopPollingRefreshUser())
  }

  hideModal = () => {
    this.props.dispatch(push('/app'))
  }

  handleResendClick = () => {
    const user = this.props.user
    if (user) {
      this.props.dispatch(emailVerification(user))
    }
  }

  render() {
    return (
      <Container>
        <div
          style={{
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Title>
                Email Verification
              </Title>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Description>
                We just sent you a verification email. Click the link to
                activate your account
              </Description>
            </div>
          </div>
          <RoundedButton
            style={{
              marginTop: MARGIN.large,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            label={'Resend'}
            onClick={this.handleResendClick}
            loading={this.props.loading}
          />
        </div>
      </Container>
    )
  }
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  background-color: ${BLUE};
  padding-top: 20px;
  flex-direction: column;
  display: flex;
  color: ${WHITE};
`

// language=SCSS prefix=dummy{ suffix=}
const Title = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 20px;
  font-weight: 400;
`

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  loading: state.screens.auth.loading,
  nav: state.nav,
})

export default connect(mapStateToProps)(EmailVerificationScreen)
