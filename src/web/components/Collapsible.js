import React from 'react'
import Collapsible from 'react-collapsible'
import styled from 'styled-components'
import { BLUE } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  .Collapsible {
    background-color: white;
  }

  .Collapsible__contentInner {
    border-bottom: 1px solid #ebebeb;
    border-left: 2px solid #ebebeb;
    border-right: 2px solid #ebebeb;
    border-top: 0;
    
    >*:first-child {
      margin-top: 0;
    }
  }
  
  .Collapsible__contentInner *:first-child {
    margin-top: 0;
  }
  
  .Collapsible__contentInner p:last-child {
    margin-bottom: 0;
  }

  .Collapsible__trigger {
    height: 52px;
    display: flex;
    align-items: center;
    font-weight: 400;
    text-decoration: none;
    color: ${BLUE};
    position: relative;
    border-right-color: rgb(234,234,234);
    border-right-width: 2px;
    border-right-style: solid;
    border-left-color: rgb(234,234,234);
    border-left-width: 2px;
    border-left-style: solid;
    border-top-color: rgb(205,205,205);
    border-top-width: 1px;
    border-top-style: solid;
    border-bottom-color: rgb(205,205,205);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    padding-left: 10px;
    background: white;
    font-size: 16px;
  }

  .Collapsible__trigger:after {
    //noinspection CssNoGenericFontName
    font-family: 'FontAwesome';
    content: '\f107';
    position: absolute;
    right: ${MARGIN.large}px;
    top: 0;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 300ms;
  }

  .Collapsible__trigger.is-open:after {
    transform: rotateZ(180deg);
  }

  .Collapsible__trigger.is-disabled {
    opacity: 0.5;
    background-color: grey;
  }
  
  .Collapsible__trigger.is-open {
    border-bottom-width: 0 !important;
    border-bottom-style: none;
    border-bottom-color: transparent;
  }
  

`

// language=SCSS prefix=dummy{ suffix=}
export default props => {
  const { style, ...rest } = props
  return (
    <Container style={style}>
      <Collapsible {...rest} />
    </Container>
  )
}
