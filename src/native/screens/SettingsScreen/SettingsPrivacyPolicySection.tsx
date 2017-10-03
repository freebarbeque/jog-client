import * as React from 'react'
import AutoHeightWebView from '~/native/components/AutoHeightWebView'

export default class SettingsPrivacyPolicySection extends React.Component {
  public render() {
    return <AutoHeightWebView source={require('./privacypolicy.html')} />
  }
}
