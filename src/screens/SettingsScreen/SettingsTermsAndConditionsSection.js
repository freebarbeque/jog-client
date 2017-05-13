/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, VERY_LIGHT_GRAY } from '../../constants/palette'
import {MARGIN} from '../../constants/style'

type SettingsTermsAndConditionsSectionProps = {
  dispatch: Dispatch,
};

type SettingsTermsAndConditionsSectionState = {};

class SettingsTermsAndConditionsSection extends Component {
  props: SettingsTermsAndConditionsSectionProps
  state: SettingsTermsAndConditionsSectionState

  constructor(props: SettingsTermsAndConditionsSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Quisque rhoncus arcu eget est tincidunt pellentesque. Curabitur tempus nunc sit amet bibendum volutpat. Nam lacus velit, feugiat in nulla ut, tristique pretium diam. Praesent ipsum nisl, rutrum aliquet aliquet nec, vehicula vel eros. Aenean euismod ex mauris, sit amet cursus tellus viverra vel. Aliquam scelerisque consequat quam ut pellentesque. Nullam maximus turpis semper facilisis porttitor. Fusce nisi purus, auctor sit amet odio id, condimentum egestas mauris. Mauris imperdiet viverra nibh mollis ullamcorper. Fusce vel volutpat turpis, et vulputate nulla. Phasellus nisi ante, tempus vitae mi et, ullamcorper mollis nisi. In varius quis tellus at imperdiet. Etiam vel massa nisl. Nulla purus lectus, vulputate ut scelerisque a, varius vitae lorem. Curabitur ac libero ligula. Integer quis sem at est accumsan pharetra sed sit amet sem.
        </Text>
        <Text style={styles.text}>
          Nulla tempor rhoncus scelerisque. Sed neque ligula, rhoncus a tempus quis, pharetra ut augue. Suspendisse leo turpis, pulvinar vel aliquam vitae, aliquet in ligula. Nam ut odio et libero interdum vulputate a in libero. Fusce eleifend justo sit amet felis congue condimentum. Proin vitae lorem vel dolor rhoncus venenatis eu a est. In vitae urna nisi. Donec scelerisque tempus nibh, quis viverra arcu semper sit amet. Vivamus vitae tristique dolor. Suspendisse non dui iaculis, porttitor odio sit amet, condimentum enim. Donec luctus augue eget feugiat malesuada. Aliquam rutrum, dui vitae vehicula ullamcorper, ligula ipsum pretium tortor, blandit placerat dolor nulla eget lorem. Quisque sed odio eu neque suscipit varius.
        </Text>
        <Text style={styles.text}>
          Aenean id consectetur dolor, bibendum vestibulum orci. Cras egestas maximus semper. In enim neque, cursus sollicitudin ligula eu, imperdiet fringilla purus. Pellentesque vel ligula vel quam pulvinar venenatis. Proin molestie ex vitae elementum tincidunt. Nulla interdum id magna ut faucibus. Vestibulum nec venenatis sapien. Fusce efficitur et velit id vestibulum.
        </Text>
        <Text style={styles.text}>
          Praesent ornare sit amet nibh eu blandit. In ut purus ut neque tempor gravida. Duis dignissim, lectus at pharetra ullamcorper, mauris massa bibendum enim, eget venenatis risus dolor nec tortor. In hac habitasse platea dictumst. Etiam malesuada consequat mi, vitae tempor velit auctor sed. Maecenas in dignissim arcu. In nec porta justo. Praesent eu efficitur tortor, sed pretium sem. Maecenas placerat felis ac enim egestas ullamcorper. Suspendisse lectus risus, euismod quis pulvinar vitae, elementum vitae nibh.
        </Text>
        <Text style={styles.text}>
          Morbi tempus eget felis eget condimentum. Nunc fringilla dictum libero et pretium. Sed vulputate hendrerit luctus. Quisque vulputate, augue vitae malesuada iaculis, tellus metus porta tortor, sit amet pharetra neque massa vel erat. Nulla sed mi ipsum. Aenean non risus justo. Praesent quis enim at sem finibus rhoncus in non justo. Vestibulum sollicitudin purus lorem, sed tempus sapien dapibus feugiat.
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GRAY,
    padding: MARGIN.large
  },
  text: {
    color: BLUE,
    marginBottom: MARGIN.base
  }
})

const mapStateToProps = (state: ReduxState) => {
  return {
    ...state
  }
}

export default connect(
  mapStateToProps,
)(SettingsTermsAndConditionsSection)
