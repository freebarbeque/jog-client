import React, { Component } from 'react'
import styled from 'styled-components'

import Collapsible from '../../components/Collapsible'
import { MARGIN } from '../../../common/constants/style'
import { WHITE } from '../../../common/constants/palette'
import AboutUs from './AboutUs'
import TermsAndConditions from './TermsAndConditions'
import CookiesPolicy from './CookiesPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import Profile from './Profile'

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
        <Profile />
        <Collapsible trigger="About Us">
          <AboutUs />
        </Collapsible>
        <Collapsible trigger="Terms and conditions">
          <TermsAndConditions />
        </Collapsible>
        <Collapsible trigger="Cookies policy">
          <CookiesPolicy />
        </Collapsible>
        <Collapsible trigger="Privacy policy">
          <PrivacyPolicy />
        </Collapsible>
      </Container>
    )
  }
}
