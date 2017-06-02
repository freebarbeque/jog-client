/* @flow */

import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Hyperlink from 'react-native-hyperlink'
import { connect } from 'react-redux'

import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { BLUE } from '../constants/palette'
import { Cancel, Logo } from '../components/images/index'
import type {ReduxState, FirebaseUser} from '../types'

type EmailPolicyScreenProps = {
  user: FirebaseUser
}

class EmailPolicyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { dispatch } = navigation

    return {
      headerTitle: <View />,
      headerLeft: (
        <Logo
          style={{
            marginLeft: MARGIN.large,
            marginTop: MARGIN.large,
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

  props: EmailPolicyScreenProps

  render() {
    const mailto = 'mailto:policies@jog.insure'
    return (
      <View style={styles.container}>
        <Text>
          Using the address associated with your account ({this.props.user.email}) please send an email to the address below, attaching all relevant policy documents
        </Text>
        <Hyperlink
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          linkStyle={styles.hyperlinkText}
          linkText={url => (url === mailto ? 'policies@jog.insure' : '')}
        >
          <Text style={styles.email}>{mailto}</Text>
        </Hyperlink>
        <View >
          <Text>
            {
              "We'll let you know by email once your policy has been added to your account"
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

  email: {
    fontSize: 20,
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large,
    textAlign: 'center'
  }
})

const mapStateToProps = (state: ReduxState) => ({user: state.auth.user})

export default connect(mapStateToProps)(EmailPolicyScreen)
