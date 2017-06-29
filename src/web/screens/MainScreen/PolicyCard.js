// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { MARGIN } from '../../../common/constants/style'
import { BLUE, WHITE } from '../../../common/constants/palette'

export type PolicyCardProps = {
  title: string,
  onPress?: () => void,
  image: any,
  topImage?: any,
  bottomImage?: any,
  description: string,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.button`
  display: block;
  background-color: WHITE;
  border-radius: 4px;
  box-shadow: 0 0 3px 2px rgba(121,126,154,0.4);
  margin-bottom: ${MARGIN.large}px;
  padding: 0;
  border: 0;
  cursor: pointer;
    
  &:hover {
    opacity: 0.7;
  }
  
  &:focus {
    outline: 0;
  }
`

// language=SCSS prefix=dummy{ suffix=}
const Cover = styled.div`
  background-color: rgb(164,169,174);
  height: 161px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  position: relative;
`

// language=SCSS prefix=dummy{ suffix=}
const Content = styled.div`
  background-color: rgb(236, 237, 239);
  height: 58px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${MARGIN.base}px;
`

// language=SCSS prefix=dummy{ suffix=}
const CompanyLogoWrapper = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${WHITE};
  box-shadow: 0 0 3px 2px rgba(121,126,154,0.4);
  position: relative;
  bottom: 40px;
  margin-left: auto;
  margin-right: auto;
`

// language=SCSS prefix=dummy{ suffix=}
const CompanyLogoOverflowWrapper = styled.div`
  overflow: hidden;
  height: 80px;
  width: 80px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 40px;
`

// language=SCSS prefix=dummy{ suffix=}
const TitleText = styled.div`
  color: ${BLUE};
  font-weight: 600;
  font-size: 17px;
  position: relative;
  bottom: 20px;
`

// language=SCSS prefix=dummy{ suffix=}
const DescriptionText = styled.div`
  color: ${BLUE};
  font-weight: 400;
  font-size: 13.28px;
  flex: 1;
  display: flex;
`

export default class PolicyCard extends Component {
  props: PolicyCardProps

  render() {
    return (
      <Container className="PolicyCard" onClick={this.props.onPress}>
        <Cover>
          <div style={{ opacity: 0.3, paddingBottom: 18 }}>
            {this.props.topImage}
          </div>
        </Cover>
        <CompanyLogoWrapper>
          <CompanyLogoOverflowWrapper>
            {this.props.image}
          </CompanyLogoOverflowWrapper>
        </CompanyLogoWrapper>
        <TitleText>
          {this.props.title}
        </TitleText>
        <Content>
          <DescriptionText
            style={{ textAlign: this.props.bottomImage ? 'left' : 'center' }}
          >
            {this.props.description}
          </DescriptionText>
          {this.props.bottomImage}
        </Content>
      </Container>
    )
  }
}
