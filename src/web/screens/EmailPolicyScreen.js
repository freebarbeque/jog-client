/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import styled from 'styled-components'
import { AppBar, FlatButton } from 'material-ui'

import { MARGIN } from '../../common/constants/style'
import { BLUE } from '../../common/constants/palette'
import type { Dispatch, FirebaseUser, ReduxState } from '../../common/types'
import { Cross, Logo } from '../components/images/index'

type EmailPolicyScreenProps = {
  user: FirebaseUser,
  dispatch: Dispatch,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  background-color: ${BLUE};
  flex: 1;
  padding: ${MARGIN.large}px;

  p {
    font-weight: 300;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const EmailText = styled.a`
  display: block;
  font-size: 20px;
  margin-top: ${MARGIN.large}px;
  margin-bottom: ${MARGIN.large}px;
  text-align: center;
  text-decoration: underline !important;
  &:hover {
    text-decoration: none !important;
  }
`

class EmailPolicyScreen extends Component {
  props: EmailPolicyScreenProps

  render() {
    const mailto = 'mailto:policies@jog.insure'
    return (
      <div>
        <AppBar
          className="NavBar"
          title={<Logo style={{ marginTop: 21 }} />}
          onTitleTouchTap={() => {
            // TODO: Go home
          }}
          iconElementLeft={<div />}
          iconElementRight={
            <FlatButton
              style={{
                textAlign: 'right',
                paddingRight: MARGIN.base,
                width: 20,
              }}
              onClick={() => {
                this.props.dispatch(goBack())
              }}
            >
              <Cross />
            </FlatButton>
          }
        />
        <Container>
          <p>
            Using the address associated with your account (
            {this.props.user.email}
            ) please send an email to the address below, attaching all relevant
            policy documents
          </p>
          <EmailText href={mailto}>policies@jog.insure</EmailText>
          <p>
            {
              "We'll let you know by email once your policy has been added to your account"
            }
          </p>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({ user: state.auth.user })

export default connect(mapStateToProps)(EmailPolicyScreen)
