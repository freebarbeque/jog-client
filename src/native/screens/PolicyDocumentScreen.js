/* @flow */

import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import type {
  ReduxState,
  MotorPolicy,
  PolicyDocument,
  Dispatch,
  ReactNavigationProp,
} from 'jog/src/common/types'

import { selectPolicies } from 'jog/src/common/store/policies/selectors'
import { BLUE, CREAM, PINK } from 'jog/src/common/constants/palette'
import { MARGIN } from 'jog/src/common/constants/style'
import { deletePolicyDocument } from 'jog/src/common/store/policies/actions'

import Text from '../components/Text'
import { Cancel } from '../components/images/index'
import Spinner from '../components/Spinner'
import DocumentViewer from '../components/DocumentViewer'

type PolicyDocumentScreenProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  policy: MotorPolicy,
  document?: PolicyDocument,
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
}

class PolicyDocumentScreen extends Component {
  props: PolicyDocumentScreenProps

  static navigationOptions = ({ navigation }) => {
    const { state, dispatch } = navigation
    const { params } = state
    const { documentName, policyId, documentId } = params

    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            marginLeft: MARGIN.base,
            marginRight: MARGIN.base,
          }}
        >
          {documentName}
        </Text>
      ),
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: MARGIN.base }}
          onPress={() => dispatch(NavigationActions.back())}
        >
          <Cancel />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={styles.headerDeleteButton}
          onPress={() => {
            dispatch(NavigationActions.back())
            dispatch(deletePolicyDocument(policyId, documentId))
          }}
        >
          <Text style={{ fontWeight: '500' }}>DELETE</Text>
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: BLUE },
    }
  }

  renderDocument() {
    const { document } = this.props
    const name = document ? document.name : ''

    if (document) {
      return <DocumentViewer document={document} />
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
    alignItems: 'center',
  },
  headerDeleteButton: {
    backgroundColor: PINK,
    width: 60,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: MARGIN.base,
  },
})

const mapStateToProps = (state: ReduxState) => state

const mergeProps = (
  state: ReduxState,
  { dispatch },
  ownProps: PolicyDocumentScreenProps,
) => {
  const policies = selectPolicies(state)
  const navigationParams = ownProps.navigation.state.params
  const policyId = navigationParams.policyId
  if (!policyId)
    throw new Error(
      'Must pass policyId to PolicyDocumentScreen via navigation params',
    )
  const documentId = navigationParams.documentId
  if (!documentId)
    throw new Error(
      'Must pass documentId to PolicyDocumentScreen via navigation params',
    )
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
export default connect(mapStateToProps, null, mergeProps)(PolicyDocumentScreen)
