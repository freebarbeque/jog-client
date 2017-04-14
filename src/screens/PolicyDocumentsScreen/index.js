/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Platform, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase'

import type { ReduxState, FirebaseUser, ReactNavigationProp } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, CREAM } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import Panel from 'jog/src/components/Panel'

const DocumentPicker = NativeModules.RNDocumentPicker

type PolicyDocumentsScreenProps = {
  // dispatch: Dispatch,
  user: FirebaseUser | null,
  navigation: ReactNavigationProp
};

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps

  handleBrowseFilesPress = () => {
    const user = this.props.user
    if (user) {
      const policyId = this.props.navigation.state.params.policyId

      if (policyId) {
        if (Platform.OS === 'ios') {
          DocumentPicker.show({
            filetype: [
              'com.adobe.pdf',
            ],
          }, (error, url) => {
            if (!error) {
              // RNFetchBlob doesn't like the file:/// protocol.
              const split = url.split('file:///')
              const filePath = split[1]
              const fileName = filePath.split('/').pop()

              RNFetchBlob.fs.readFile(filePath, 'base64').then((data) => {
                const storagePath = `/policyDocuments/${user.uid}/${policyId}/${fileName}`
                console.debug(`Storing file at "${storagePath}"`)
                const ref = firebase.storage().ref(storagePath)
                ref.putString(data, 'base64').then(() => {
                  console.log('Upload success')
                }).catch((err) => {
                  console.error('Upload failure', err)
                })
              }).catch((err) => {
                // TODO: Handle errors
                console.error(err)
              })
            } else {
              // TODO: Handle errors
            }
          })
        } else {
          throw new Error('NYI: Android file picker')
        }
      } else {
        throw new Error('policyId is not present in the navigation params, therefore cannot upload the policy document')
      }
    } else {
      throw new Error('Should not be able to upload without a user being logged in...')
    }
  }

  handleUseCameraPress = () => { // TODO
    const isSimulator = DeviceInfo.getModel() === 'Simulator'
    // The simulator has no camera access
    if (isSimulator) {
      // eslint-disable-next-line no-unused-vars
      ImagePicker.launchImageLibrary({}, (response) => {

      })
    } else {
      // eslint-disable-next-line no-unused-vars
      ImagePicker.launchCamera({}, (response) => {

      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Panel style={styles.panel}>
          <Text style={styles.header}>Upload documents</Text>
          <TouchableOpacity
            style={styles.camera}
            onPress={this.handleUseCameraPress}
          >
            <Text style={styles.cameraText}>
              Use your camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.browseFilesButton}
            onPress={this.handleBrowseFilesPress}
          >
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
    height: 130,
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
