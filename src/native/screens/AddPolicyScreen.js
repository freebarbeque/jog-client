/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch } from 'jog/src/common/types'
import Text from 'jog/src/native/components/Text'
import {
  BLUE,
  CREAM,
  WHITE,
  VERY_LIGHT_GRAY,
  DARK_GRAY,
  PINK,
} from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'
import { clearManualPolicy } from 'jog/src/common/store/screens/addManualPolicy/actions'

import { Camera, Command, Mail } from '../components/images/index'
import { uploadPolicy } from '../../common/store/screens/addPolicyScreen/actions'
import BackgroundHeader from '../components/BackgroundHeader'

type AddPolicyScreenProps = {
  dispatch: Dispatch,
  // user: FirebaseUser | null,
}

class AddPolicyScreen extends Component {
  props: AddPolicyScreenProps

  render() {
    return (
      <View style={{ flex: 1 }}>
        <BackgroundHeader headerText={'Add Policy'} />
        <View style={styles.container}>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => {
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'EmailPolicy',
                  }),
                )
              }}
            >
              <View
                style={{ flex: 1, height: '100%', justifyContent: 'center' }}
              >
                <Text style={styles.recommendedText}>Recommended</Text>
                <Text style={[styles.cardButtonText, { flex: 0 }]}>
                  Email the policy
                </Text>
              </View>
              <Mail />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => this.props.dispatch(uploadPolicy())}
            >
              <Text style={styles.cardButtonText}>
                Upload / Photograph your policy
              </Text>
              <Camera />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardButton, { borderBottomWidth: 0 }]}
              onPress={() => {
                this.props.dispatch(clearManualPolicy())
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'ManualAddPolicy',
                  }),
                )
              }}
            >
              <Text style={styles.cardButtonText}>Manual entry</Text>
              <Command />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    padding: MARGIN.large,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 4,
    borderColor: VERY_LIGHT_GRAY,
    shadowColor: DARK_GRAY,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  cardButton: {
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    borderBottomWidth: 1,
    borderBottomColor: VERY_LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
  },
  cardButtonText: {
    color: BLUE,
    fontSize: 15,
    flex: 1,
  },
  recommendedText: {
    color: PINK,
    fontSize: 11,
  },
  mockPoliciesButton: {
    backgroundColor: PINK,
    height: 40,
    borderRadius: 4,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(AddPolicyScreen)
