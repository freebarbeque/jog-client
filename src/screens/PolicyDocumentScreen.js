/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, WebView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import PhotoView from 'react-native-photo-view'
import RNFetchBlob from 'react-native-fetch-blob'
import PDFView from 'react-native-pdf-view'

import type { ReduxState, MotorPolicy, PolicyDocument, Dispatch, ReactNavigationProp } from 'jog/src/types'

import { selectPolicies } from '../store/policies/selectors'
import { BLUE, CREAM, PINK } from '../constants/palette'
import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { Cancel } from '../components/images/index'
import Spinner from '../components/Spinner'
import { deletePolicyDocument } from '../store/policies/actions'

type PolicyDocumentScreenProps = {
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  policy: MotorPolicy,
  document?: PolicyDocument,
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
};

type PolicyDocumentScreenState = {
  url: string | null,
  width: number | null,
  height: number | null,
  androidPdfLocation: string | null
}

const IS_ANDROID = Platform.OS === 'android'

async function downloadDocument(url: string, fileName: string) : Promise<string> {
  const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir
  const res = await RNFetchBlob.fetch('GET', url)
  const base64str = res.data
  const pdfLocation = `${DocumentDir}/${fileName}`
  await RNFetchBlob.fs.writeFile(pdfLocation, base64str, 'base64')
  console.debug(`Wrote ${url} to ${pdfLocation}`)
  return pdfLocation
}

class PolicyDocumentScreen extends Component {
  props: PolicyDocumentScreenProps
  state: PolicyDocumentScreenState

  static navigationOptions = {
    header: (props) => {
      const { state, dispatch } = props
      const { params } = state

      const { documentName, policyId, documentId } = params

      return {
        title: (
          <Text style={{ textAlign: 'center', marginLeft: MARGIN.base, marginRight: MARGIN.base }}>
            {documentName}
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
          <TouchableOpacity
            style={styles.headerDeleteButton}
            onPress={() => {
              dispatch(NavigationActions.back())
              dispatch(deletePolicyDocument(policyId, documentId))
            }}
          >
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
      androidPdfLocation: null
    }
  }

  componentDidMount() {
    this.getDocument().catch((err) => {
      console.error(err)
    })
  }


  async getDocument() {
    const document = this.props.document

    if (document) {
      const path = document.image
      const ref = firebase.storage().ref(path)
      const url = await ref.getDownloadURL()

      console.debug(`Obtained download url for ${document.name}: ${url}`)

      if (document.extension !== 'pdf') {
        console.debug('Fetching image width and height')
        const { width, height } = await new Promise((resolve, reject) => {
          Image.getSize(url, (fullWidth, fullHeight) => { resolve({ width: fullWidth, height: fullHeight }) }, reject)
        })
        console.debug('Fetched image width and height', width, height)

        const displayWidth = Dimensions.get('window').width
        const displayHeight = (displayWidth / width) * height

        const stateUpdates : Object = {
          url,
          width: displayWidth,
          height: displayHeight,
        }

        this.setState(stateUpdates)
      } else {
        const stateUpdates: Object = {
          url,
          androidPdfLocation: null
        }

        if (IS_ANDROID && document.extension === 'pdf') {
          console.debug('We\'re on android therefore need to download the document to display it!')
          stateUpdates.androidPdfLocation = await downloadDocument(url, document.name)
        }

        this.setState(stateUpdates)
      }
    }
  }

  renderDocument() {
    const { document } = this.props
    const { url, width, height, androidPdfLocation } = this.state

    const windowWidth = Dimensions.get('window').width

    if (document) {
      if (document.extension === 'pdf') {
        if (IS_ANDROID) {
          return (
            <PDFView
              src={androidPdfLocation}
              style={{ flex: 1, width: windowWidth }}
            />
          )
        } else if (url) {
          return (
            <WebView
              source={{ uri: url }}
              style={{ width: windowWidth, backgroundColor: CREAM }}
              javaScriptEnabled={IS_ANDROID}
              domStorageEnabled={IS_ANDROID}
              scalesPageToFit
              automaticallyAdjustContentInsets={false}
            />
          )
        }
      } else if (url) {
        console.log('rendering PhotoView', url)
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
    }

    return null
  }

  render() {
    const { url, androidPdfLocation } = this.state
    const { document } = this.props

    const isPdf = document && document.extension === 'pdf'

    const isLoaded = url && (!IS_ANDROID || isPdf && androidPdfLocation || !isPdf)

    const name = document ? document.name : ''

    return (
      <View style={styles.container}>
        {
          isLoaded ? this.renderDocument() : <Spinner text={`Loading ${name}`} />
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
