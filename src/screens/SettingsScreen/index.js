/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Accordion from 'react-native-collapsible/Accordion'

import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, WHITE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { setActiveSection } from '../../store/screens/settings/actions'
import AnimatedChevron from './AnimatedChevron'

type SettingsProps = {
  dispatch: Dispatch,
  activeSection: number | null
};

type SettingsState = {};

const ACCORDION_SECTIONS = ['My profile', 'About us', 'Terms and conditions', 'Privacy policy']


class SettingsScreen extends Component {
  props: SettingsProps
  state: SettingsState

  constructor(props: SettingsProps) {
    super(props)
    this.state = {}
  }

  renderHeader = (content: any, index: number, isActive: boolean) => {
    const isFirst = index === 0
    const isLast = index === ACCORDION_SECTIONS.length - 1

    // Must wrap in a View to avoid setNativeProps error on TouchableOpacity used by react-collapsible
    return (
      <View style={[styles.policyHeader, { borderTopWidth: isFirst ? 2 : 1, borderBottomWidth: isLast ? 2 : 1 }]}>
        <Text style={styles.policyHeaderText}>
          {content}
        </Text>
        <AnimatedChevron rotation={isActive ? 'up' : 'down'} />
      </View>
    )
  }

  renderContent = (content: any, index: number, isActive: boolean) => {
    return (
      <View>
        <Text>TODO</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={ACCORDION_SECTIONS}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          activeSection={this.props.activeSection}
          onChange={(index: number) => { this.props.dispatch(setActiveSection(index)) }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.base
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
    flex: 1
  },
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
  activeSection: state.screens.settings.activeSection
})

export default connect(
  mapStateToProps,
)(SettingsScreen)
