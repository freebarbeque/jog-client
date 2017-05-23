/* @flow */

import React, { Component } from 'react'
import AutoHeightWebView from '../../components/AutoHeightWebView'

export default class SettingsTermsAndConditionsSection extends Component {
  render() {
    return (
      <AutoHeightWebView
        source={require('./terms.html')}
      />
    )
  }
}
