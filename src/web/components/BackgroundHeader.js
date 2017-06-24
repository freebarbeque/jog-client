/* @flow */

import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import { MARGIN } from '../../common/constants/style'
import { Chevron } from './images/index'
import { WHITE } from '../../common/constants/palette'

type BackgroundHeaderProps = {
  headerText: string,
  subheaderText?: string | null,
  onPress?: () => void,
  dispatch: Dispatch,
  enableBackPress?: boolean,
}

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImageOverlay = styled.div`
  width: 100%;
  height: 100px;
  background-color: rgba(0,0,0,0.25);
  position: absolute;
  top: 0;
  left: 0;
`

// language=SCSS prefix=dummy{ suffix=}
const BackgroundImage = styled.div`
  height: 100px;
  width: 100%;
  justify-content: center;  
  background: url(/static/background2.png);
  background-size: cover;
`

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.div`
  height: 100px;
  width: 100%;
`

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`
  font-size: 20px;
`

// language=SCSS prefix=dummy{ suffix=}
const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
`

// language=SCSS prefix=dummy{ suffix=}
const RotatedChevron = styled(Chevron)`
  margin-right: ${MARGIN.base}px;
  transform: rotate(180deg);
  stroke: white;
  
  * {
    stroke: white;
  }
`

class BackgroundHeader extends Component {
  props: BackgroundHeaderProps

  static defaultProps = {
    enableBackPress: true,
  }

  defaultBack = () => {
    this.props.dispatch(goBack())
  }

  renderContent() {
    return (
      <div className="BackgroundHeader">
        <BackgroundImage className="BackgroundHeader__BackgroundImage" />
        <BackgroundImageOverlay />
        <Content className="BackgroundHeader__Content">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: MARGIN.large,
            }}
          >
            {this.props.enableBackPress &&
              <RotatedChevron color="white" scale={1.2} />}
            <Header>
              {this.props.headerText}
            </Header>
          </div>
          {this.props.subheaderText &&
            <div>
              {this.props.subheaderText}
            </div>}
        </Content>
      </div>
    )
  }

  render() {
    if (this.props.enableBackPress) {
      return (
        <Button onClick={this.props.onPress || this.defaultBack}>
          {this.renderContent()}
        </Button>
      )
    }
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

export default connect()(BackgroundHeader)
