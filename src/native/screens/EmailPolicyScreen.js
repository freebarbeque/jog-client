/* @flow */

import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, Clipboard } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import FadeInView from 'react-native-fade-in-view'

import { MARGIN } from 'jog/src/common/constants/style'
import { BLUE, PINK } from 'jog/src/common/constants/palette'
import type { ReduxState, FirebaseUser } from 'jog/src/common/types'

import { Cancel, Logo } from '../components/images'
import Text from '../components/Text'

type EmailPolicyScreenProps = {
  user: FirebaseUser,
}

type EmailPolicyScreenState = {
  copiedToClipboard: boolean,
}

class EmailPolicyScreen extends Component {
  props: EmailPolicyScreenProps
  state: EmailPolicyScreenState

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

  constructor(props) {
    super(props)
    this.state = {
      copiedToClipboard: false,
    }
  }

  handleEmailClick = () => {
    this.setState({ copiedToClipboard: true })
    Clipboard.setString('policies@jog.insure')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Using the address associated with your account (
          {this.props.user.email}
          ) please send an email to the address below, attaching all relevant
          policy documents
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
          onPress={this.handleEmailClick}
        >
          <Text style={styles.email}>policies@jog.insure</Text>
        </TouchableOpacity>
        <View>
          <Text>
            {
              "We'll let you know by email once your policy has been added to your account"
            }
          </Text>
        </View>
        {this.state.copiedToClipboard
          ? <FadeInView duration={300} style={{ marginTop: MARGIN.large }}>
              <Text style={{ textAlign: 'center', fontSize: 12, color: PINK }}>
                Email address copied to clipboard
              </Text>
            </FadeInView>
          : null}
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
  email: {
    fontSize: 20,
    marginTop: MARGIN.large,
    marginBottom: MARGIN.large,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
})

const mapStateToProps = (state: ReduxState) => ({ user: state.auth.user })

export default connect(mapStateToProps)(EmailPolicyScreen)
