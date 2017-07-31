import * as React from 'react'
import styled from 'styled-components'
import { push } from 'react-router-redux'
import { connect, DispatchProp } from 'react-redux'

import { BLUE, PINK } from '../../common/constants/palette'
import Jumbotron from '../components/Jumbotron'
import { Dispatch, Action } from '../../common/types'
import { max, min } from '../media'
import { MARGIN } from '../../common/constants/style'
import { Details, PolicyBots, Upload } from '../components/images/index'
import Container from '../components/Container'

const background = require('../../static/background.png')

interface GetStartedScreenProps {}
interface ConnectedGetStartedScreenProps
  extends DispatchProp<Action>,
    GetStartedScreenProps {}

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImageOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.button`
  background-color: ${PINK};
  height: 60px !important;
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
  bottom: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

// language=SCSS prefix=dummy{ suffix=}
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  ${max.smallTablet`
    flex: 1;
  `} ${min.smallTablet`
    margin-top: ${MARGIN.xxl}px;
    height: 400px;
  `};
`

// language=SCSS prefix=dummy{ suffix=}
const Grid = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${MARGIN.extraLarge}px;

  ${max.smallTablet`
    display: none;
  `};
`

// language=SCSS prefix=dummy{ suffix=}
const GridItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: ${MARGIN.base}px;
  margin-right: ${MARGIN.base}px;

  > * {
    margin-top: 2.5px !important;
    margin-bottom: 2.5px !important;
    text-align: center;
  }

  h1 {
    font-weight: 500 !important;
    font-size: 20px !important;
    text-transform: lowercase;
    color: ${BLUE} !important;
  }

  h2 {
    color: ${PINK} !important;
    text-transform: uppercase;
    font-size: 10px !important;
  }

  p {
    font-size: 14px !important;
    color: ${BLUE} !important;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const GridItemHeader = styled.div`
  min-height: 124px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

class GetStartedScreen extends React.Component<ConnectedGetStartedScreenProps> {
  handleButtonPress = () => {
    this.props.dispatch(push('/app/tabs/policies/addPolicy'))
  }

  render() {
    return (
      <Container className="GetStartedScreen">
        <HeaderContainer className="HeaderContainer">
          <BackgroundImage className="BackgroundImage" />
          <BackgroundImageOverlay className="BackgroundImageOverlay" />
          <JumbotronWrapper>
            <Jumbotron />
          </JumbotronWrapper>
        </HeaderContainer>
        <Button onClick={this.handleButtonPress}>
          Add your motor policy to get started
        </Button>
        <Grid>
          <GridItem>
            <GridItemHeader>
              <Upload />
              <h2>get started</h2>
            </GridItemHeader>
            <h1>easy upload your policies</h1>
            <p>secure your details to our online lockbox</p>
          </GridItem>
          <GridItem>
            <GridItemHeader>
              <Details />
              <h2>always available</h2>
            </GridItemHeader>
            <h1>your details always at hand</h1>
            <p>A touch away when and where you need them</p>
          </GridItem>
          <GridItem>
            <GridItemHeader>
              <PolicyBots />
              <h2>always searching</h2>
            </GridItemHeader>
            <h1>coming soon</h1>
            <p>
              Our policy bots will be hard at work checking your cover
              optimisation every day
            </p>
          </GridItem>
        </Grid>
      </Container>
    )
  }
}

const ConnectedGetStartedScreen: React.ComponentClass<
  GetStartedScreenProps
> = connect()(GetStartedScreen)
export default ConnectedGetStartedScreen
