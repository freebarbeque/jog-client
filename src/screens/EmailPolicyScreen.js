/* @flow */

import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Hyperlink from 'react-native-hyperlink'

import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { BLUE } from '../constants/palette'
import { Cancel, Logo } from '../components/images/index'

export default class EmailPolicyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { dispatch } = navigation

    return {
      headerTitle: <View />,
      headerLeft: (
        <Logo
          style={{
            marginLeft: MARGIN.large,
            marginBottom: MARGIN.base,
            marginTop: MARGIN.base,
          }}
          scale={1}
        />
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: MARGIN.large, marginTop: MARGIN.base }}
          onPress={() => dispatch(NavigationActions.back())}
        >
          <Cancel />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: BLUE },
    }
  }

  render() {
    const mailto = 'mailto:policies@jog.com'
    return (
      <View style={styles.container}>
        <Hyperlink
          style={{ flexDirection: 'row', flexWrap: 'wrap' }}
          linkStyle={styles.hyperlinkText}
          linkText={url => (url === mailto ? 'policies@jog.com' : '')}
        >
          <Text>
            Please email
            {' '}
            {mailto}
            {' '}
            from the email address associated with your account, attaching all relevant policy documents.
          </Text>
        </Hyperlink>
        <View style={{ marginTop: MARGIN.base }}>
          <Text>
            {
              "Once your policy is added to your account you'll receive an email in return."
            }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE,
    flex: 1,
    padding: MARGIN.large,
  },

  hyperlinkText: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
})
