import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { Dispatch, ReduxState, FirebaseUser } from '../../common/types'
import {
  pollRefreshUser,
  stopPollingRefreshUser,
} from '../../common/store/auth/actions'
import { emailVerification } from '../../common/store/screens/auth/actions'
import { MARGIN } from '../../common/constants/style'
import RoundedButton from '../components/RoundedButton'
import Title from '../components/Title'
import FlexCenteredContainer from '../components/FlexCenteredContainer'
import { NAVIGATION_BAR_HEIGHT } from '../constants/style'

type EmailVerificationScreenProps = {
  dispatch: Dispatch
  user: FirebaseUser | null
  loading: boolean
}

// language=SCSS prefix=dummy{ suffix=}
const Description = styled.div`
  text-align: center;
  margin-top: ${MARGIN.large}px;
  font-size: 14px;
  font-weight: 400;
  margin-left: ${MARGIN.large}px;
  margin-right: ${MARGIN.large}px;
`

class EmailVerificationScreen extends React.Component<
  EmailVerificationScreenProps
> {
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
      <FlexCenteredContainer style={{ paddingBottom: NAVIGATION_BAR_HEIGHT }}>
        <div>
          <Title>Email Verification</Title>

          <Description>
            We just sent you a verification email. Click the link to activate
            your account
          </Description>
          <RoundedButton
            style={{
              marginTop: MARGIN.xxl,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            label={'Resend'}
            onClick={this.handleResendClick}
            loading={this.props.loading}
          />
        </div>
      </FlexCenteredContainer>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  loading: state.screens.auth.loading,
})

export default connect(mapStateToProps)(EmailVerificationScreen)
