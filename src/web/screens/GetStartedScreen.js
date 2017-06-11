/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { PINK } from '../../common/constants/palette'
import Jumbotron from '../components/Jumbotron'

type GetStartedScreenProps = {
  onGetStartedPress: () => void,
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
  background-size: cover;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: url(/background.png) no-repeat center center fixed;
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImageOverlay = styled.div`
  width: 100%;
  height: 100%;
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
  cursor: pointer;
`

export default class GetStartedScreen extends Component {
  props: GetStartedScreenProps

  render() {
    return (
      <Container className="get-started-screen-container">
        <BackgroundImage />
        <BackgroundImageOverlay />
        <JumbotronWrapper>
          <Jumbotron />
        </JumbotronWrapper>
        <Button onPress={this.props.onGetStartedPress}>
          Add your motor policy to get started
        </Button>
      </Container>
    )
  }
}
