import * as React from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import AndroidAutoHeightWebView from 'react-native-webview-autoheight'
import { BLUE, VERY_LIGHT_GRAY } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { isAndroid } from '~/native/util/system'

interface IAutoHeightWebViewProps {
  source: any
}

interface IAutoHeightWebViewState {
  webviewHeight: number
}

export default class AutoHeightWebView extends React.Component<
  IAutoHeightWebViewProps,
  IAutoHeightWebViewState
> {
  constructor(props: IAutoHeightWebViewProps) {
    super(props)
    this.state = {
      webviewHeight: 100, // default height, can be anything
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        {isAndroid() ? this.renderAndroid() : this.renderIOS()}
      </View>
    )
  }

  private updateWebViewHeight = (event: any) => {
    // jsEvaluationValue contains result of injected JS
    const height = event.jsEvaluationValue // Only available on iOS!
    this.setState({
      webviewHeight: parseInt(height, 10),
    })
  }

  private renderIOS() {
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

  private renderAndroid() {
    return (
      <AndroidAutoHeightWebView
        source={this.props.source}
        automaticallyAdjustContentInsets
        style={{ width: '100%', backgroundColor: VERY_LIGHT_GRAY }}
        startInLoadingState
      />
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
