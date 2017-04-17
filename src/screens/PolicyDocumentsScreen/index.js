/* @flow */

import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import type { ReduxState, ReactNavigationProp, Dispatch, MotorPolicyMap, PolicyDocument } from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { BLUE, CREAM } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import Panel from 'jog/src/components/Panel'
import { uploadPolicyDocument } from 'jog/src/store/policies/actions'
import { pickFile, useCamera } from 'jog/src/util/files'
import { selectPolicies } from 'jog/src/store/policies/selectors'
import PolicyDocumentThumbnail from 'jog/src/components/PolicyDocumentThumbnail'

type PolicyDocumentsScreenProps = {
  dispatch: Dispatch,
  // Eslint barfs here for some reason... navigation is def being used.
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
  policies: MotorPolicyMap,
};

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps

  uploadFile = async (fn: () => Promise<string>) => {
    const policyId = this.props.navigation.state.params.policyId

    if (policyId) {
      const uri = await fn()
      this.props.dispatch(uploadPolicyDocument(uri, policyId))
    } else {
      throw new Error('policyId is not present in the navigation params, therefore cannot upload the policy document')
    }
  }

  handleBrowseFilesPress = () => {
    this.uploadFile(pickFile).catch((err) => {
      // TODO: Display error to user
      console.error(err)
    })
  }

  handleUseCameraPress = () => {
    this.uploadFile(useCamera).catch((err) => {
      // TODO: Display error to user
      console.error(err)
    })
  }

  render() {
    const policyId = this.props.navigation.state.params.policyId
    const policy = this.props.policies[policyId]
    const documents = _.values(policy.documents)

    return (
      <ScrollView style={styles.container}>
        <Panel style={styles.panel}>
          <Text style={styles.header}>Scanned documents</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {documents.map((d: PolicyDocument) => {
              return (
                <PolicyDocumentThumbnail document={d} style={{ width: '50%', marginBottom: MARGIN.large }} />
              )
            })}
          </View>
        </Panel>
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
