/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import type { ReduxState } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import ImagePicker from 'react-native-image-picker'
import Panel from '../../components/Panel'
import { CREAM } from '../../constants/palette'

type PolicyDocumentsScreenProps = {
  // dispatch: Dispatch,
  // user: number,
};

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps

  render() {
    return (
      <View style={styles.container}>
        <Panel style={styles.panel}>
          <Text style={styles.header}>Upload documents</Text>
          <View style={styles.camera}>
            <Text style={styles.cameraText}>
              Use your camera
            </Text>
          </View>
          <TouchableOpacity style={styles.browseFilesButton}>
            <View>
              <Text style={styles.browseFilesButtonText}>
                Browse Files
              </Text>
            </View>
          </TouchableOpacity>
        </Panel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM
  },
  header: {
    fontSize: 16,
    color: BLUE,
    textAlign: 'center',
    marginBottom: MARGIN.large
  },
  camera: {
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: 'rgb(164,169,174)',
    borderWidth: 1,
    borderRadius: 14
  },
  cameraText: {
    fontSize: 16,
    color: 'rgb(164,169,174)'
  },
  panel: {
    padding: MARGIN.extraLarge,
  },
  browseFilesButton: {
    height: 64,
    backgroundColor: 'rgb(224, 225, 226)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: MARGIN.large
  },
  browseFilesButtonText: {
    color: BLUE,
    fontSize: 16
  }
})

const mapStateToProps = (state: ReduxState) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
)(PolicyDocumentsScreen)
