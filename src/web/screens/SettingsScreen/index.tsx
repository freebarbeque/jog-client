import * as React from 'react'
import styled from 'styled-components'

import { CREAM } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import Collapsible from '../../components/Collapsible'
import Container from '../../components/Container'
import ScrollToTopOnMount from '../../components/ScrollToTopOnMount'
import { max } from '../../media'
import AboutUs from './AboutUs'
import CookiesPolicy from './CookiesPolicy'
import PrivacyPolicy from './PrivacyPolicy'
import Profile from './Profile'
import TermsAndConditions from './TermsAndConditions'

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

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <SettingsScreenContainer className="SettingsScreen">
        <ScrollToTopOnMount />
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
