/* @flow */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import type {
  ReduxState,
  Dispatch,
  FirebaseUser,
  UserDetails,
} from 'jog/src/types'
import Text from 'jog/src/components/Text'
import { AddProfilePicture, Chevron } from 'jog/src/components/images/index'
import { BLUE, PINK, VERY_LIGHT_GRAY, WHITE } from 'jog/src/constants/palette'
import { MARGIN } from 'jog/src/constants/style'
import CameraModal from 'jog/src/components/CameraModal'
import { useIOSCamera } from 'jog/src/util/files'
import type { iOSImageResponse } from 'jog/src/util/files'
import { declareError } from 'jog/src/store/errors/actions'
import { updateUserProfilePicture } from 'jog/src/store/auth/actions'
import BigRedFullWidthButton from '../../components/BigRedFullWidthButton'

type SettingsProfileSectionProps = {
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  user: FirebaseUser,
  userDetails: UserDetails | null,
}

type SettingsProfileSectionState = {}

const Field = props => (
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
  cameraModal: CameraModal

  static handleSupportPress() {
    Linking.openURL('mailto:support@jog.com?subject=Support')
  }

  constructor(props: SettingsProfileSectionProps) {
    super(props)
    this.state = {}
  }

  handleProfilePicturePress = () => {
    if (Platform.OS === 'ios') {
      useIOSCamera()
        .then((response: iOSImageResponse | null) => {
          if (response) {
            // If no response, user cancelled.
            this.props.dispatch(updateUserProfilePicture(response.uri))
          }
        })
        .catch(err => {
          this.props.dispatch(declareError(err))
        })
    } else {
      this.cameraModal.setModalVisible(true)
    }
  }

  handleCapture = fileUrl => {
    this.props.dispatch(updateUserProfilePicture(fileUrl))
  }

  render() {
    const userDetails = this.props.userDetails || {}
    const address = userDetails.address
    const hasAddress =
      address && (address.line1 || address.line2 || address.city)

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleProfilePicturePress}>
            {userDetails.profilePhotoURL
              ? <Image
                  source={{ uri: userDetails.profilePhotoURL }}
                  style={styles.profilePhoto}
                />
              : <AddProfilePicture />}
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
            {address && hasAddress
              ? <Text>
                  {address.line1
                    ? <Text style={styles.fieldValue}>
                        {`${address.line1}\n`}
                      </Text>
                    : null}
                  {address.line2
                    ? <Text style={styles.fieldValue}>
                        {`${address.line2}\n`}
                      </Text>
                    : null}
                  {address.city
                    ? <Text style={styles.fieldValue}>
                        {`${address.city}`}
                      </Text>
                    : null}
                </Text>
              : <Text style={styles.fieldValue}>-</Text>}
          </Field>
          <Field title="Post code" style={{ borderBottomColor: 'transparent' }}>
            {address && address.postCode ? address.postCode : '-'}
          </Field>
          <BigRedFullWidthButton
            onPress={SettingsProfileSection.handleSupportPress}
          >
            <View>
              <Text style={{ fontWeight: '600', fontSize: 11 }}>
                TO MAKE PROFILE CHANGES EMAIL:
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 14 }}>
                support@jog.insure
              </Text>
            </View>
          </BigRedFullWidthButton>
        </View>
        <CameraModal
          ref={e => {
            this.cameraModal = e
          }}
          onCapture={this.handleCapture}
          onError={error => {
            console.error(error)
          }}
        />
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
    borderBottomWidth: 2,
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
    fontWeight: '600',
  },
  fieldValue: {
    color: BLUE,
    fontSize: 16,
  },
  content: {
    backgroundColor: VERY_LIGHT_GRAY,
  },
  profilePhoto: { width: 77, height: 77, borderRadius: 77 / 2 },
})

const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.auth.user,
    userDetails: state.auth.details,
  }
}

export default connect(mapStateToProps)(SettingsProfileSection)
