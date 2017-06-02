/* @flow */

import React, { Component } from 'react'

import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'

import type { Dispatch, ReduxState } from '../types'
import Text from './Text'
import { BLUE, GREEN, PINK } from '../constants/palette'
import { MARGIN } from '../constants/style'
import { Notification } from './images/index'
import {
  enablePushNotifications,
  hidePushNotificationsModal,
} from '../store/push/actions'

type EnablePushNotificationsModalProps = {
  dispatch: Dispatch,
  visible: boolean,
}

class EnablePushNotificationsModal extends Component {
  props: EnablePushNotificationsModalProps

  handlePress = () => {}

  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={this.props.visible}
        onRequestClose={() => {}}
      >
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text
                style={{ color: BLUE, fontWeight: '700', textAlign: 'center' }}
              >
                Notifications
              </Text>
              <Text style={{ color: BLUE, marginTop: MARGIN.base }}>
                Jog would like to send you the occasional reminder of when your insurance policies are close to expiring.
              </Text>
              <Text style={{ color: BLUE, marginTop: MARGIN.base }}>
                If you tap confirm, you may see the following dialog:
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Notification scale={0.25} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() =>
                    this.props.dispatch(hidePushNotificationsModal())}
                >
                  <Text>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => this.props.dispatch(enablePushNotifications())}
                >
                  <Text>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: GREEN,
    height: 40,
    borderRadius: 8,
    minWidth: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: PINK,
    height: 40,
    borderRadius: 8,
    minWidth: 120,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 6,
    width: 300,
    height: 400,
    justifyContent: 'center',
    padding: MARGIN.large,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = (state: ReduxState) => {
  return {
    visible: state.push.showModal,
  }
}

export default connect(mapStateToProps)(EnablePushNotificationsModal)
