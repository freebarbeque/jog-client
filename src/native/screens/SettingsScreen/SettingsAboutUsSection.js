/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/common/types'
import Text from 'jog/src/native/components/Text'
import { VERY_LIGHT_GRAY, BLUE } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'

type SettingsAboutUsSectionProps = {
  dispatch: Dispatch,
}

type SettingsAboutUsSectionState = {}

class SettingsAboutUsSection extends Component {
  props: SettingsAboutUsSectionProps
  state: SettingsAboutUsSectionState

  constructor(props: SettingsAboutUsSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean libero
          felis, condimentum vel dui eu, vulputate aliquam arcu.
          Donec vestibulum mi et metus pellentesque, et convallis nulla mollis.
          Donec non tincidunt tellus.
          Curabitur suscipit lacus nec turpis pulvinar venenatis. Nunc finibus
          in neque ac tempus.
          Vestibulum accumsan quis lectus vel fermentum. Aenean facilisis elit
          id efficitur ornare.
          Donec volutpat odio ac dui sagittis lobortis. In posuere quis nulla ut
          maximus.
          Phasellus volutpat molestie leo, in ultricies mi pulvinar at. Vivamus
          blandit interdum tellus nec ultrices.
          Morbi aliquet neque sed erat varius venenatis. Nam non bibendum diam.
          Nam id nunc tempus, faucibus tellus ornare, egestas felis.
          Etiam tincidunt dignissim tellus, condimentum rhoncus massa placerat
          sed. Nunc auctor odio a arcu fermentum, et pretium felis commodo.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GRAY,
    padding: MARGIN.large,
  },
})

const mapStateToProps = (state: ReduxState) => {
  return {
    ...state,
  }
}

export default connect(mapStateToProps)(SettingsAboutUsSection)
