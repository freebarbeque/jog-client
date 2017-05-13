/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, VERY_LIGHT_GRAY } from '../../constants/palette'
import { MARGIN } from '../../constants/style'

type SettingsPrivacyPolicySectionProps = {
  dispatch: Dispatch,
};

type SettingsPrivacyPolicySectionState = {};

class SettingsPrivacyPolicySection extends Component {
  props: SettingsPrivacyPolicySectionProps
  state: SettingsPrivacyPolicySectionState

  constructor(props: SettingsPrivacyPolicySectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Nam rutrum dui at erat lacinia cursus. Aliquam at sagittis mauris. Mauris et dictum lorem. Sed venenatis justo ex, ac vehicula ipsum elementum id. Sed sit amet rhoncus arcu. Etiam tincidunt velit et nibh mattis bibendum nec in risus. Nulla ante ex, egestas non libero sit amet, egestas hendrerit libero. Aliquam ligula sem, rutrum non felis sed, suscipit sodales tellus. Sed in interdum dolor, sit amet feugiat nunc.
        </Text>
        <Text style={styles.text}>
          Ut sed elit bibendum, congue nibh convallis, mollis dui. Ut pellentesque finibus magna, sed gravida erat blandit sed. Nullam quis sapien a lectus rhoncus posuere. Ut sed malesuada risus. Donec hendrerit urna ac vulputate tempor. Nam condimentum enim tellus, eu vulputate sapien maximus in. Donec placerat neque mauris. Vestibulum maximus augue at nibh pellentesque, vel mollis nibh iaculis. Suspendisse id vulputate erat. Aenean rhoncus euismod elit a gravida. Pellentesque sit amet feugiat eros, et aliquet tellus. Nulla facilisi. Sed faucibus arcu a massa gravida, sit amet convallis magna fermentum. Donec porta dignissim ligula et scelerisque. Phasellus euismod sit amet dui non finibus. Mauris nec neque leo.
        </Text>
        <Text style={styles.text}>
          Mauris rhoncus turpis leo, laoreet tristique nulla tristique in. In sagittis lectus bibendum, gravida nulla sed, tincidunt sem. In ligula mi, congue ac tortor vel, gravida placerat mi. Etiam in varius urna. Pellentesque elit nisi, tristique at maximus in, pellentesque vitae sem. Nam feugiat posuere sem, a aliquam sem facilisis id. Nulla et nunc est. Sed dapibus, est eget convallis suscipit, nisl sem bibendum turpis, at semper ipsum orci vel mi. Suspendisse eget velit faucibus, ullamcorper dolor in, vehicula nibh. Aenean quis sapien porta mi congue blandit. Aenean feugiat aliquet sagittis. Vestibulum quis tincidunt mi, et posuere ligula. In velit justo, gravida at erat sit amet, convallis commodo leo. Proin pharetra lorem libero. Nam vel nulla feugiat, suscipit dui id, rutrum massa. Etiam sit amet imperdiet nulla, venenatis sodales libero.
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
)(SettingsPrivacyPolicySection)
