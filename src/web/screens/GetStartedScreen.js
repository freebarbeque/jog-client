/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { PINK } from '../../common/constants/palette'
import Jumbotron from '../components/Jumbotron'
import { Dispatch } from '../../common/types'

type GetStartedScreenProps = {
  dispatch: Dispatch,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: url(/static/background.png) no-repeat center center fixed;
  background-size: cover;
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImageOverlay = styled.div`
  width: 100%;
  height: calc(100% - 60px)%;
  background-color: rgba(0,0,0,0.25);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  background-color: ${PINK};
  height: 60px;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: white;
  z-index: 2;
  border: 0;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: 0;
  }
  
  &:hover {
    opacity: 0.7;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const JumbotronWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 25px;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

class GetStartedScreen extends Component {
  props: GetStartedScreenProps

  handleButtonPress = () => {
    this.props.dispatch(push('/app/tabs/policies/addPolicy'))
  }

  render() {
    return (
      <Container className="get-started-screen-container">
        <BackgroundImage className="background-image" />
        <BackgroundImageOverlay className="background-image-overlay" />
        <JumbotronWrapper>
          <Jumbotron />
        </JumbotronWrapper>
        <Button onClick={this.handleButtonPress}>
          Add your motor policy to get started
        </Button>
      </Container>
    )
  }
}

export default connect()(GetStartedScreen)
