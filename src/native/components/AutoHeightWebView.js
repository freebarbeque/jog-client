/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, WebView } from 'react-native'
import { BLUE, VERY_LIGHT_GRAY } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'
import AndroidAutoHeightWebView from 'react-native-webview-autoheight'
import { isAndroid } from 'jog/src/native/util/system'

type AutoHeightWebViewProps = {
  source: any,
}
type AutoHeightWebViewState = {
  webviewHeight: number,
}

export default class AutoHeightWebView extends Component {
  props: AutoHeightWebViewProps
  state: AutoHeightWebViewState

  constructor(props: AutoHeightWebViewProps) {
    super(props)
    this.state = {
      webviewHeight: 100, // default height, can be anything
    }
  }

  updateWebViewHeight = event => {
    // jsEvaluationValue contains result of injected JS
    const height = event.jsEvaluationValue // Only available on iOS!
    this.setState({
      webviewHeight: parseInt(height, 10),
    })
  }

  renderIOS() {
    const height = this.state.webviewHeight

    return (
      <WebView
        style={{ width: '100%', height, backgroundColor: VERY_LIGHT_GRAY }}
        source={this.props.source}
        injectedJavaScript="document.body.scrollHeight;"
        onNavigationStateChange={this.updateWebViewHeight}
        automaticallyAdjustContentInsets
      />
    )
  }

  renderAndroid() {
    return (
      <AndroidAutoHeightWebView
        source={this.props.source}
        automaticallyAdjustContentInsets
        style={{ width: '100%', backgroundColor: VERY_LIGHT_GRAY }}
        startInLoadingState
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {isAndroid() ? this.renderAndroid() : this.renderIOS()}
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
    flexDirection: 'row',
  },
  text: {
    color: BLUE,
    marginBottom: MARGIN.base,
  },
})
