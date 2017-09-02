import * as React from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux'
import { BLUE, VERY_LIGHT_GRAY } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { IReduxState, IUserDetails } from '~/common/types'
import Text from '~/native/components/Text'
import {
  disablePushNotifications,
  enablePushNotifications,
  showPushNotificationsModal,
} from '~/native/store/push/actions'
import { isAndroid } from '~/native/util/system'

interface ISettingsNotificationsProps extends DispatchProp<any> {
  userDetails: IUserDetails
}

class SettingsNotificationsSection extends React.Component<
  ISettingsNotificationsProps
> {
  public render() {
    const userDetails = this.props.userDetails || {}

    return (
      <View style={styles.container}>
        <Text style={{ color: BLUE }}>
          When notifications are enabled, Jog will send you reminders when your
          policy is due to expire or has already expired.
        </Text>
        <View
          style={{
            marginTop: MARGIN.base,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: BLUE }}>Enable Notifications</Text>
          <View style={{ flex: 1 }} />
          <Switch
            value={userDetails.enableNotifications}
            onValueChange={value => {
              if (value) {
                if (isAndroid()) {
                  this.props.dispatch(enablePushNotifications())
                } else {
                  this.props.dispatch(showPushNotificationsModal())
                }
              } else {
                this.props.dispatch(disablePushNotifications())
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

const mapStateToProps = (state: IReduxState) => {
  return {
    userDetails: state.auth.details,
  }
}

export default connect(mapStateToProps)(SettingsNotificationsSection)
