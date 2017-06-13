/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'
import { BLUE, CREAM, PINK, WHITE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { Camera, Cursor, Letter } from '../components/images/index'
import type { Dispatch, ReduxState } from '../../common/types'

type AddPolicyScreenProps = {
  dispatch: Dispatch,
  // user: FirebaseUser | null,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${CREAM};
  padding: ${MARGIN.base}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Card = styled.div`
  background-color: ${WHITE};
  border-radius: 4px;
  box-shadow: 0 0 3px 2px rgba(121,126,154,0.4);
`
// language=SCSS prefix=dummy{ suffix=}
const CardButton = styled.button`
  padding-left: ${MARGIN.large}px;
  padding-right: ${MARGIN.large}px;
  border-bottom-color: ${CREAM};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  
  width: 100%;
  height: 65px;
  color: ${BLUE};
  font-size: 16px;
  text-align: left;
  background-color: transparent;
  border-right: none;
  border-left: none;
  border-top: none;
  cursor: pointer;
  
  &:focus {
    outline: 0;
  }
  
  &:hover {
    opacity: 0.7;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const RecommendedText = styled.div`
  color: ${PINK};
  font-size: 11px;
`

class AddPolicyScreen extends Component {
  props: AddPolicyScreenProps

  render() {
    return (
      <Container>
        <Card>
          <CardButton
            onClick={() => this.props.dispatch(push('/app/policies/email'))}
          >
            <div style={{ flex: 1 }}>
              <RecommendedText>
                Recommended
              </RecommendedText>
              <span>
                Email the policy
              </span>
            </div>
            <Letter />
          </CardButton>
          <CardButton>
            <span style={{ flex: 1 }}>
              Photograph your policy
            </span>
            <Camera />
          </CardButton>
          <CardButton
            style={{ borderBottomWidth: 0 }}
            onClick={() => this.props.dispatch(push('/app/policies/manual'))}
          >
            <span style={{ flex: 1 }}>
              Manual entry
            </span>
            <Cursor />
          </CardButton>
        </Card>
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(AddPolicyScreen)
