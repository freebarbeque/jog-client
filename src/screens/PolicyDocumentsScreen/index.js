/* @flow */

import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type { ReduxState, ReactNavigationProp, Dispatch, MotorPolicyMap, PolicyDocument } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, CREAM } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import Panel from 'jog/src/components/Panel'
import { uploadPolicyDocument } from 'jog/src/store/policies/actions'
import { pickFile, useIOSCamera } from 'jog/src/util/files'
import { selectPolicies } from 'jog/src/store/policies/selectors'
import PolicyDocumentThumbnail from 'jog/src/components/PolicyDocumentThumbnail'
import CameraModal from 'jog/src/components/CameraModal'
import type { iOSImageResponse } from '../../util/files'
import { declareError } from '../../store/errors/actions'

type PolicyDocumentsScreenProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
  policies: MotorPolicyMap,
};

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps
  cameraModal: any

  handleBrowseFilesPress = () => {
    pickFile().then((resp) => {
      const policyId = this.props.navigation.state.params.policyId
      this.props.dispatch(uploadPolicyDocument({
        fileUrl: resp.url,
        policyId,
        extension: resp.extension,
        fileName: resp.fileName
      }))
    })
  }

  handleUseCameraPress = () => {
    if (Platform.OS === 'ios') {
      useIOSCamera().then((response: iOSImageResponse | null) => {
        if (response) { // If no response, user cancelled.
          const path = response.uri.split('file://').pop()

          const policyId = this.props.navigation.state.params.policyId
          this.props.dispatch(uploadPolicyDocument({
            fileUrl: path,
            policyId,
            extension: response.extension,
            fileName: response.fileName
          }))
        }
      }).catch((err) => {
        this.props.dispatch(declareError(err))
      })
    } else {
      this.cameraModal.setModalVisible(true)
    }
  }

  handleCapture = (fileUrl) => {
    const policyId = this.props.navigation.state.params.policyId
    const fileName = fileUrl.split('/').pop()
    const extension = fileName.split('.').pop().toLowerCase()

    this.props.dispatch(uploadPolicyDocument({
      fileUrl,
      policyId,
      extension,
      fileName
    }))
  }

  render() {
    const policyId = this.props.navigation.state.params.policyId
    const policy = this.props.policies[policyId]
    const documents = _.values(policy.documents)

    return (
      <ScrollView style={styles.container}>
        {documents.length ? <Panel style={styles.panel}>
          <Text style={styles.header}>Scanned documents</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {documents.map((d: PolicyDocument) => {
              return (
                <PolicyDocumentThumbnail
                  key={d.id}
                  document={d}
                  style={{ width: `${100 / 3}%`, paddingBottom: MARGIN.large }}
                  onPress={() => {
                    const params = {
                      documentId: d.id,
                      policyId: policyId,
                      documentName: d.name
                    }
                    this.props.dispatch(
                      NavigationActions.navigate({
                        routeName: 'PolicyDocument',
                        params
                      })
                    )
                  }}
                />
              )
            })}
          </View>
        </Panel> : null}
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
        <CameraModal
          ref={(e) => { this.cameraModal = e }}
          onCapture={this.handleCapture}
          onError={(error) => { console.error(error) }}
        />
      </ScrollView>
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
  policies: selectPolicies(state),
})

export default connect(
  mapStateToProps,
)(PolicyDocumentsScreen)
