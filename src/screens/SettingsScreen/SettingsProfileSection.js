/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch, FirebaseUser, UserDetails } from 'jog/src/types'
import Text from '../../components/Text'
import { AddProfilePicture, Chevron } from '../../components/images/index'
import { BLUE, PINK, VERY_LIGHT_GRAY, WHITE } from '../../constants/palette'
import { MARGIN } from '../../constants/style'

type SettingsProfileSectionProps = {
  dispatch: Dispatch,
  user: FirebaseUser,
  userDetails: UserDetails | null,
};

type SettingsProfileSectionState = {};

const Field = (props) => (
  <View style={[styles.fieldContainer, props.style || {}]}>
    <Text style={styles.fieldTitle}>
      {props.title.toUpperCase()}
    </Text>
    <Text style={[styles.fieldValue]}>
      {props.children}
    </Text>
  </View>
)

class SettingsProfileSection extends Component {
  props: SettingsProfileSectionProps
  state: SettingsProfileSectionState

  static handleSupportPress() {
    Linking.openURL('mailto:support@jog.com?subject=Support')
  }

  constructor(props: SettingsProfileSectionProps) {
    super(props)
    this.state = {}
  }

  render() {
    const userDetails = this.props.userDetails || {}
    const address = userDetails.address
    const hasAddress = address && (address.line1 || address.line2 || address.city)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <AddProfilePicture />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Field title="First name">
            {userDetails.firstName || '-'}
          </Field>
          <Field title="Surname">
            {userDetails.lastName || '-'}
          </Field>
          <Field title="Date of birth">
            {userDetails.dob || '-'}
          </Field>
          <Field title="Address">
            {hasAddress ? <View>
              {address.line1 ? <Text style={styles.fieldValue}>
                {`${address.line1}\n`}
              </Text> : null}
              {address.line2 ? <Text style={styles.fieldValue}>
                {`${address.line2}\n`}
              </Text> : null}
              {address.city ? <Text style={styles.fieldValue}>
                {`${address.city}\n`}
              </Text> : null}
            </View> : <Text style={styles.fieldValue}>-</Text>}
          </Field>
          <Field title="Post code" style={{ borderBottomColor: 'transparent' }}>
            {address && address.postCode ? address.postCode : '-'}
          </Field>
          <TouchableOpacity style={styles.support} onPress={SettingsProfileSection.handleSupportPress}>
            <View style={{ flex: 1 }}>
              <View>
                <Text style={{ fontWeight: '600', fontSize: 11 }}>
                TO MAKE PROFILE CHANGES EMAIL:
              </Text>
              </View>
              <View>
                <Text style={{ fontSize: 14 }}>
                support@jog.com
              </Text>
              </View>
            </View>
            <View>
              <Chevron style={{ transform: [{ rotate: '270deg' }] }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: WHITE,
    paddingLeft: MARGIN.base,
    paddingBottom: MARGIN.base,
    overflow: 'hidden',
    borderLeftColor: 'rgb(234,234,234)',
    borderRightColor: 'rgb(234,234,234)',
    borderBottomColor: 'rgb(234,234,234)',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2
  },
  fieldContainer: {
    minHeight: 30,
    paddingTop: MARGIN.base,
    paddingBottom: MARGIN.base,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(205,205,205)',
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
  },
  fieldTitle: {
    color: 'rgb(164,169,174)',
    fontSize: 11,
    fontWeight: '600'
  },
  fieldValue: {
    color: BLUE,
    fontSize: 16
  },
  content: {
    backgroundColor: VERY_LIGHT_GRAY
  },
  support: {
    backgroundColor: PINK,
    height: 60,
    alignItems: 'center',
    paddingLeft: MARGIN.large,
    paddingRight: MARGIN.large,
    flexDirection: 'row'
  }
})

const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.auth.user,
    userDetails: state.auth.details
  }
}

export default connect(
  mapStateToProps,
)(SettingsProfileSection)
