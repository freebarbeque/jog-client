/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { Dispatch } from 'jog/src/types'

import { BLUE } from 'jog/src/constants/palette'
import Text from 'jog/src/components/Text'
import { MARGIN } from 'jog/src/constants/style'
import RoundedButton from 'jog/src/components/RoundedButton'

type ConfirmPasswordResetScreenProps = {
  dispatch: Dispatch,
}

class ConfirmPasswordResetScreen extends Component {
  props: ConfirmPasswordResetScreenProps

  goBack = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const window = Dimensions.get('window')
    const windowWidth = window.width

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            width: windowWidth,
            justifyContent: 'center',
          }}
        >
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>
                Password Reset
              </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.description}>
                We just sent you an email through which you can reset your password.
              </Text>
            </View>
          </View>
          <RoundedButton
            style={{ marginTop: MARGIN.large }}
            label={'Back'}
            onPress={this.goBack}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    paddingTop: 20,
    flexDirection: 'column',
  },
  header: {
    paddingLeft: 10,
    flexDirection: 'row',
    paddingRight: 10,
  },
  headerLogo: {
    marginTop: 3,
  },
  title: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 20,
    fontWeight: '300',
  },
  description: {
    textAlign: 'center',
    marginTop: MARGIN.large,
    fontSize: 14,
    fontWeight: '300',
    marginLeft: MARGIN.large,
    marginRight: MARGIN.large,
  },
})

export default connect()(ConfirmPasswordResetScreen)
