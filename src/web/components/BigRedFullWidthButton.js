// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

import { Chevron } from './images/index'
import { PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const Button = styled.a`
  background-color: ${PINK};
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1;
  border: none;
  color: white !important;
  cursor: pointer !important;
  
  &:hover {
    text-decoration: none !important;
    opacity: 0.7;
  }
  
  &:active {
    text-decoration: none !important;
  }
  
  &:focus {
    outline: 0;
    text-decoration: none !important;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Content = styled.div`
  flex: 1;
  padding-left: ${MARGIN.large}px;
  color: white !important;
`

export default class BigRedFullWidthButton extends Component {
  props: {
    onClick?: () => void,
    children?: any,
    style?: any,
    hideChevron?: boolean,
  }

  render() {
    return (
      <Button
        className="BigRedFullWidthButton"
        style={this.props.style}
        onClick={this.props.onClick}
      >
        <Content className="BigRedFullWidthButton__Content">
          {this.props.children}
        </Content>
        {!this.props.hideChevron
          ? <div>
              <Chevron style={{ color: 'white', paddingRight: MARGIN.large }} />
            </div>
          : null}
      </Button>
    )
  }
}