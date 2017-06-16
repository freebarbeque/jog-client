import React, { Component } from 'react'
import styled from 'styled-components'

import Collapsible from '../../components/Collapsible'
import { MARGIN } from '../../../common/constants/style'
import { WHITE } from '../../../common/constants/palette'
import AboutUs from './AboutUs'
import TermsAndConditions from './TermsAndConditions'

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  padding: ${MARGIN.base}px;
  background-color: ${WHITE};
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`

export default class SettingsScreen extends Component {
  render() {
    return (
      <Container className="settings-tab-container">
        <Collapsible trigger="My Profile">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
        <Collapsible trigger="About Us">
          <AboutUs />
        </Collapsible>
        <Collapsible trigger="Terms and conditions">
          <TermsAndConditions />
        </Collapsible>
        <Collapsible trigger="Cookies policy">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
        <Collapsible trigger="Privacy policy">
          <p>
            This is the collapsible content. It can be any element or React
            component you like.
          </p>
          <p>
            It can even be another Collapsible component. Check out the next
            section!
          </p>
        </Collapsible>
      </Container>
    )
  }
}
