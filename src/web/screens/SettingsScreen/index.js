import React, { Component } from 'react'
import styled from 'styled-components'

import Collapsible from '../../components/Collapsible'
import { CREAM } from '../../../common/constants/palette'
import AboutUs from './AboutUs'
import TermsAndConditions from './TermsAndConditions'
import CookiesPolicy from './CookiesPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import Profile from './Profile'
import Container from '../../components/Container'
import { MARGIN } from '../../../common/constants/style'
import { max } from '../../media'

// language=SCSS prefix=dummy{ suffix=}
const SettingsScreenContainer = styled(Container)`
  background-color: ${CREAM};
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin-top: ${MARGIN.extraLarge}px;

  ${max.smallTablet`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 0;
  `}
`

export default class SettingsScreen extends Component {
  render() {
    return (
      <SettingsScreenContainer className="SettingsScreen">
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
      </SettingsScreenContainer>
    )
  }
}
