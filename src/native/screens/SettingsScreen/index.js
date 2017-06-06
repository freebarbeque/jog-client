/* @flow */

import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion'

import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/native/components/Text'
import { BLUE, WHITE, CREAM } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'
import { setActiveSection } from 'jog/src/common/store/screens/settings/actions'

import AnimatedChevron from './AnimatedChevron'
import SettingsProfileSection from './SettingsProfileSection'
import SettingsPrivacyPolicySection from './SettingsPrivacyPolicySection'
import SettingsTermsAndConditionsSection
  from './SettingsTermsAndConditionsSection'
import SettingsAboutUsSection from './SettingsAboutUsSection'
import SettingsNotificationsSection from './SettingsNotificationsSection'

type SettingsProps = {
  dispatch: Dispatch,
  activeSection: number | null,
}

type SettingsState = {}

type AccordionSection = {
  title: string,
  component: any,
}

const ACCORDION_SECTIONS: AccordionSection[] = [
  { title: 'My profile', component: SettingsProfileSection },
  { title: 'Notifications', component: SettingsNotificationsSection },
  { title: 'About us', component: SettingsAboutUsSection },
  {
    title: 'Terms and conditions',
    component: SettingsTermsAndConditionsSection,
  },
  { title: 'Privacy policy', component: SettingsPrivacyPolicySection },
]

class SettingsScreen extends Component {
  props: SettingsProps
  state: SettingsState

  constructor(props: SettingsProps) {
    super(props)
    this.state = {}
  }

  renderHeader = (
    section: AccordionSection,
    index: number,
    isActive: boolean,
  ) => {
    const isFirst = index === 0
    const isLast = index === ACCORDION_SECTIONS.length - 1

    // Must wrap in a View to avoid setNativeProps error on TouchableOpacity used by react-collapsible
    const extraPolicyHeaderStyles = {
      borderTopWidth: isFirst ? 2 : 1,
      borderBottomWidth: isActive ? 0 : isLast ? 2 : 1,
    }

    return (
      <View style={[styles.policyHeader, extraPolicyHeaderStyles]}>
        <Text style={styles.policyHeaderText}>
          {section.title}
        </Text>
        <AnimatedChevron rotation={isActive ? 'up' : 'down'} />
      </View>
    )
  }

  renderContent = (section: AccordionSection) => {
    const Comp = section.component
    return <Comp />
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Accordion
          sections={ACCORDION_SECTIONS}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          activeSection={this.props.activeSection}
          onChange={(index: number) => {
            this.props.dispatch(setActiveSection(index))
          }}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: MARGIN.base,
    backgroundColor: CREAM,
  },
  policyHeader: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: MARGIN.large,
    borderRightColor: 'rgb(234,234,234)',
    borderRightWidth: 2,
    borderLeftColor: 'rgb(234,234,234)',
    borderLeftWidth: 2,
    borderBottomColor: 'rgb(205,205,205)',
    borderTopColor: 'rgb(205,205,205)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  policyHeaderText: {
    fontSize: 16,
    color: BLUE,
    margin: MARGIN.large,
    flex: 1,
  },
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  activeSection: state.screens.settings.activeSection,
})

export default connect(mapStateToProps)(SettingsScreen)
