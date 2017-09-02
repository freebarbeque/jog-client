import * as React from 'react'
import AutoHeightWebView from '../../components/AutoHeightWebView'

export default class SettingsTermsAndConditionsSection extends React.Component {
  public render() {
    return <AutoHeightWebView source={require('./terms.html')} />
  }
}
