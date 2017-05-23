/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, WebView } from 'react-native'
import { BLUE, VERY_LIGHT_GRAY } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'

type AutoHeightWebViewProps = {
  source: any,
};
type AutoHeightWebViewState = {
  webviewHeight: number
};

export default class AutoHeightWebView extends Component {
  props: AutoHeightWebViewProps
  state: AutoHeightWebViewState

  constructor(props: AutoHeightWebViewProps) {
    super(props)
    this.state = {
      webviewHeight: 100 // default height, can be anything
    }
  }

  updateWebViewHeight = (event) => {
    // jsEvaluationValue contains result of injected JS
    this.setState({ webviewHeight: parseInt(event.jsEvaluationValue, 10) })
  }

  render() {
    const height = this.state.webviewHeight

    return (
      <View style={styles.container}>
        <WebView
          style={{ width: '100%', height, backgroundColor: VERY_LIGHT_GRAY }}
          source={this.props.source}
          injectedJavaScript="document.body.scrollHeight;"
          scrollEnabled={false}
          onNavigationStateChange={this.updateWebViewHeight}
          automaticallyAdjustContentInsets
        />
      </View>
    )
  }
}

//
// Styles
//

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
