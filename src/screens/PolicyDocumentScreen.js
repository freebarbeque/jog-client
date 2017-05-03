/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import firebase from 'firebase'
import PhotoView from 'react-native-photo-view'

import type { ReduxState, MotorPolicy, PolicyDocument, Dispatch, ReactNavigationProp } from 'jog/src/types'

import { selectPolicies } from '../store/policies/selectors'
import { BLUE, CREAM, PINK } from '../constants/palette'
import Text from '../components/Text'
import { MARGIN } from '../constants/style'
import { Cancel } from '../components/images/index'
import Spinner from '../components/Spinner'
import { deletePolicyDocument } from '../store/policies/actions'
import PDFViewer from '../components/PDFViewer'

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
        }

        this.setState(stateUpdates)
      }
    }
  }

  renderDocument() {
    const { document } = this.props
    const { url, width, height } = this.state
    const name = document ? document.name : ''

    if (document) {
      if (document.extension === 'pdf' && url) {
        return (
          <PDFViewer
            url={url}
            fileName={document.name}
          />
        )
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

    return <Spinner text={`Loading ${name}`} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDocument()}
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
