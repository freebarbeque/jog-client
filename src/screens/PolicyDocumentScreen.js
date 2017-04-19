/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, WebView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'

import type { ReduxState, MotorPolicy, PolicyDocument, Dispatch, ReactNavigationProp } from 'jog/src/types'
import PhotoView from 'react-native-photo-view'
import { selectPolicies } from '../store/policies/selectors'
import { BLUE, CREAM, PINK } from '../constants/palette'
import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { Cancel } from '../components/images/index'
import Spinner from '../components/Spinner'

type PolicyDocumentScreenProps = {
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  policy: MotorPolicy,
  document: PolicyDocument,
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
};

type PolicyDocumentScreenState = {
  url: string | null,
  width: number | null,
  height: number | null
}

class PolicyDocumentScreen extends Component {
  props: PolicyDocumentScreenProps
  state: PolicyDocumentScreenState

  static navigationOptions = {
    header: (props) => {
      const { state, dispatch } = props
      const { params } = state

      return {
        title: (
          <Text style={{ textAlign: 'center' }}>
            {params.documentName}
          </Text>
        ),
        left: (
          <TouchableOpacity
            style={{ marginLeft: MARGIN.base }}
            onPress={() => dispatch(NavigationActions.back())}
          >
            <Cancel />
          </TouchableOpacity>
        ),
        right: (
          <TouchableOpacity style={styles.headerDeleteButton}>
            <Text style={{ fontWeight: '500' }}>
              DELETE
            </Text>
          </TouchableOpacity>
        ),
        style: { backgroundColor: BLUE }
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      url: null,
      width: null,
      height: null,
    }
  }

  componentDidMount() {
    this.downloadImage().catch((err) => {
      console.error(err)
    })
  }

  async downloadImage() {
    const document = this.props.document
    const path = document.image
    const ref = firebase.storage().ref(path)
    const url = await ref.getDownloadURL()

    console.debug('Obtained firebase url', url)

    if (document.extension !== 'pdf') {
      const { width, height } = await new Promise((resolve, reject) => {
        Image.getSize(url, (fullWidth, fullHeight) => { resolve({ width: fullWidth, height: fullHeight }) }, reject)
      })

      const displayWidth = Dimensions.get('window').width
      const displayHeight = (displayWidth / width) * height
      const stateUpdates = { url, width: displayWidth, height: displayHeight }

      this.setState(stateUpdates)
    } else {
      this.setState({ url })
    }
  }

  renderDocument() {
    const { document } = this.props
    const { url, width, height } = this.state


    if (document.extension === 'pdf') {
      return (
        <WebView
          source={{ uri: url }}
          style={{ width: Dimensions.get('window').width, backgroundColor: CREAM }}
          javaScriptEnabled={false}
          domStorageEnabled={false}
          scalesPageToFit
          automaticallyAdjustContentInsets={false}
        />
      )
    }
    return (
      <PhotoView
        source={{ uri: url }}
        minimumZoomScale={0.5}
        maximumZoomScale={3}
        androidScaleType="center"
        onLoad={() => console.log('Image loaded!')}
        style={{ flex: 1, width, height }}
      />
    )
  }

  render() {
    const { url } = this.state

    return (
      <View style={styles.container}>
        {
          url ? this.renderDocument() : <Spinner text={`Loading ${this.props.document.name}`} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerDeleteButton: {
    backgroundColor: PINK,
    width: 60,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: MARGIN.base
  }
})

const mapStateToProps = (state: ReduxState) => (state)

const mergeProps = (state: ReduxState, { dispatch }, ownProps: PolicyDocumentScreenProps) => {
  const policies = selectPolicies(state)
  const navigationParams = ownProps.navigation.state.params
  const policyId = navigationParams.policyId
  if (!policyId) throw new Error('Must pass policyId to PolicyDocumentScreen via navigation params')
  const documentId = navigationParams.documentId
  if (!documentId) throw new Error('Must pass documentId to PolicyDocumentScreen via navigation params')
  const policy = policies[policyId]
  if (policy) {
    const documents = policy.documents
    let document
    if (documents) {
      document = documents[documentId]
    }
    if (!document) throw new Error(`Policy does not have a document with id ${documentId}`)
    return {
      dispatch,
      policy,
      document,
    }
  }
  throw new Error(`No policy with id ${policyId}`)
}

// $FlowFixMe
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(PolicyDocumentScreen)
