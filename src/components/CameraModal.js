/* @flow */

import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import Camera from 'react-native-camera'
import { WHITE } from '../constants/palette'
import { CameraWhite } from './images/index'
import Text from './Text'
import { MARGIN } from '../constants/style'

type CameraModalProps = {
  onCapture: (data: string) => void,
  onError: (error: any) => void,
};
type CameraModalState = {
  modalVisible: boolean
};

export default class CameraModal extends Component {
  props: CameraModalProps
  state: CameraModalState
  camera: any

  constructor(props: CameraModalProps) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  takePicture = () => {
    const options = {}
    // options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => {
        this.props.onCapture(data.path)
        this.setModalVisible(false)
      })
      .catch((err) => this.props.onError(err))
  }

  setModalVisible(visible: boolean) {
    this.setState({ modalVisible: visible })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style={{ height: 40, backgroundColor: 'black' }}>
            <TouchableOpacity
              onPress={() => this.setModalVisible(false)}
            >
              <Text style={{ color: WHITE, marginLeft: MARGIN.large }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <Camera
            ref={(cam) => {
              this.camera = cam
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
          >
            <TouchableOpacity
              style={styles.capture}
              onPress={this.takePicture}
            >
              <CameraWhite scale={0.8} />
            </TouchableOpacity>
          </Camera>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    padding: 10,
    margin: 30
  },
})
