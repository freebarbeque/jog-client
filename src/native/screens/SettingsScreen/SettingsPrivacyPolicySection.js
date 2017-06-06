/* @flow */

import React, { Component } from 'react'
import AutoHeightWebView from 'jog/src/native/components/AutoHeightWebView'

export default class SettingsPrivacyPolicySection extends Component {
  render() {
    return <AutoHeightWebView source={require('./privacypolicy.html')} />
  }
}
