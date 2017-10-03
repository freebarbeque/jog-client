import * as React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import * as _ from 'lodash'
import { BLUE, CREAM } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { declareError } from '~/common/store/errors/actions'
import { uploadPolicyDocument } from '~/common/store/policies/actions'
import { selectPolicies } from '~/common/store/policies/selectors'
import { IMotorPolicyMap, IPolicyDocument, IReduxState } from '~/common/types'
import CameraModal from '~/native/components/CameraModal'
import Panel from '~/native/components/Panel'
import PolicyDocumentThumbnail from '~/native/components/PolicyDocumentThumbnail'
import Text from '~/native/components/Text'
import { IIOSImageResponse, pickFile, useIOSCamera } from '~/native/util/files'

interface IProps extends DispatchProp<any> {
  policies: IMotorPolicyMap
}

class PolicyDocumentsScreen extends React.Component<IProps> {
  private cameraModal: any

  public render() {
    const policyId = (this.props as any).navigation.state.params.policyId
    const policy = this.props.policies[policyId]
    const documents = _.values(policy.documents)

    return (
      <ScrollView style={styles.container}>
        {!_.isEmpty(documents)
          ? <Panel style={styles.panel}>
              <Text style={styles.header}>Scanned documents</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {documents.map((d: IPolicyDocument) => {
                  return (
                    <PolicyDocumentThumbnail
                      key={d.id}
                      document={d}
                      style={{
                        width: `${100 / 3}%`,
                        paddingBottom: MARGIN.large,
                      }}
                      onPress={() => {
                        const params = {
                          documentId: d.id,
                          policyId,
                          documentName: d.name,
                        }
                        this.props.dispatch(
                          NavigationActions.navigate({
                            routeName: 'PolicyDocument',
                            params,
                          }),
                        )
                      }}
                    />
                  )
                })}
              </View>
            </Panel>
          : null}
        <Panel style={styles.panel}>
          <Text style={styles.header}>Upload documents</Text>
          <TouchableOpacity
            style={styles.camera}
            onPress={this.handleUseCameraPress}
          >
            <Text style={styles.cameraText}>Use your camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.browseFilesButton}
            onPress={this.handleBrowseFilesPress}
          >
            <View>
              <Text style={styles.browseFilesButtonText}>Browse Files</Text>
            </View>
          </TouchableOpacity>
        </Panel>
        <CameraModal
          ref={e => {
            this.cameraModal = e
          }}
          onCapture={this.handleCapture}
          onError={error => {
            console.error(error)
          }}
        />
      </ScrollView>
    )
  }

  private handleBrowseFilesPress = () => {
    pickFile().then(resp => {
      const policyId = (this.props as any).navigation.state.params.policyId
      const fileUrl = resp.url
      this.props.dispatch(
        uploadPolicyDocument({
          fileUrl,
          policyId,
          extension: resp.extension || undefined,
          fileName: resp.fileName || undefined,
        }),
      )
    })
  }

  private handleUseCameraPress = () => {
    if (Platform.OS === 'ios') {
      useIOSCamera()
        .then((response: IIOSImageResponse | null) => {
          if (response) {
            // If no response, user cancelled.
            const path = response.uri.split('file://').pop()

            const policyId = (this.props as any).navigation.state.params
              .policyId
            this.props.dispatch(
              uploadPolicyDocument({
                fileUrl: path,
                policyId,
                extension: response.extension,
                fileName: response.fileName,
              }),
            )
          }
        })
        .catch(err => {
          this.props.dispatch(declareError(err))
        })
    } else {
      this.cameraModal.setModalVisible(true)
    }
  }

  private handleCapture = fileUrl => {
    const policyId = (this.props as any).navigation.state.params.policyId
    const fileName = fileUrl.split('/').pop()
    const extension = fileName.split('.').pop().toLowerCase()

    this.props.dispatch(
      uploadPolicyDocument({
        fileUrl,
        policyId,
        extension,
        fileName,
      }),
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
  },
  header: {
    fontSize: 16,
    color: BLUE,
    textAlign: 'center',
    marginBottom: MARGIN.large,
  },
  camera: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: 'rgb(164,169,174)',
    borderWidth: 1,
    borderRadius: 14,
  },
  cameraText: {
    fontSize: 16,
    color: 'rgb(164,169,174)',
  },
  panel: {
    padding: MARGIN.extraLarge,
  },
  browseFilesButton: {
    height: 64,
    backgroundColor: 'rgb(224, 225, 226)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: MARGIN.large,
  },
  browseFilesButtonText: {
    color: BLUE,
    fontSize: 16,
  },
})

const mapStateToProps = (state: IReduxState) => ({
  policies: selectPolicies(state),
})

export default connect(mapStateToProps)(PolicyDocumentsScreen)
