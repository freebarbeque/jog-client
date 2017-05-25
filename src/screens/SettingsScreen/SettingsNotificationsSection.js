/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, Switch } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState, Dispatch, UserDetails } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { VERY_LIGHT_GRAY, BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import { updateUserDetails } from '../../store/auth/actions'
import {disablePushNotifications, enablePushNotifications, showPushNotificationsModal} from '../../store/push/actions'
import {isAndroid} from '../../util/system'

type SettingsNotificationsProps = {
  dispatch: Dispatch,
  userDetails: UserDetails,
}

type SettingsNotificationsState = {}

class SettingsNotificationsSection extends Component {
  props: SettingsNotificationsProps
  state: SettingsNotificationsState

  constructor(props: SettingsNotificationsProps) {
    super(props)
    this.state = {}
  }

  render() {
    const userDetails = this.props.userDetails || {}

    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          When notifications are enabled, Jog will send you reminders when your policy is due to expire or has already expired.
        </Text>
        <View
          style={{
            marginTop: MARGIN.base,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: BLUE }}>
            Enable Notifications
          </Text>
          <View style={{ flex: 1 }} />
          <Switch
            value={userDetails.enableNotifications}
            onValueChange={value => {
              if (value) {
                if (isAndroid()) {
                  this.props.dispatch(
                    enablePushNotifications()
                  )
                } else {
                  this.props.dispatch(
                    showPushNotificationsModal()
                  )
                }
              } else {
                this.props.dispatch(
                  disablePushNotifications()
                )
              }
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VERY_LIGHT_GRAY,
    padding: MARGIN.large,
  },
})

const mapStateToProps = (state: ReduxState) => {
  return {
    userDetails: state.auth.details,
  }
}

export default connect(mapStateToProps)(SettingsNotificationsSection)
