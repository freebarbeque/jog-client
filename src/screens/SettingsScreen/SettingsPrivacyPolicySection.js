/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, WebView } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/types'
import { BLUE, VERY_LIGHT_GRAY } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

type SettingsPrivacyPolicySectionProps = {
  dispatch: Dispatch,
};

type SettingsPrivacyPolicySectionState = {
  webviewHeight: number
};

class SettingsPrivacyPolicySection extends Component {
  props: SettingsPrivacyPolicySectionProps
  state: SettingsPrivacyPolicySectionState

  constructor(props: SettingsPrivacyPolicySectionProps) {
    super(props)
    this.state = {
      webViewHeight: 100 // default height, can be anything
    }
  }

  updateWebViewHeight = (event) => {
  // jsEvaluationValue contains result of injected JS
    this.setState({ webViewHeight: parseInt(event.jsEvaluationValue, 10) })
  }

  render() {
    const height = this.state.webViewHeight

    return (
      <View style={styles.container}>
        <WebView
          style={{ width: '100%', height, backgroundColor: VERY_LIGHT_GRAY }}
          source={require('./privacypolicy.html')}
          injectedJavaScript="document.body.scrollHeight;"
          scrollEnabled={false}
          onNavigationStateChange={this.updateWebViewHeight}
          automaticallyAdjustContentInsets
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GRAY,
    padding: MARGIN.base,
    flexDirection: 'row'
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
