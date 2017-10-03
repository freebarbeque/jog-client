import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect, DispatchProp } from 'react-redux'

import {
  IMotorPolicy,
  IPolicyDocument,
  IReactNavigationProp,
  IReduxState,
} from '~/common/types'

import { BLUE, CREAM, PINK } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import { deletePolicyDocument } from '~/common/store/policies/actions'
import { selectPolicies } from '~/common/store/policies/selectors'

import DocumentViewer from '../components/DocumentViewer'
import { Cancel } from '../components/images/index'
import Spinner from '../components/Spinner'
import Text from '../components/Text'

interface IProps extends DispatchProp<any> {
  policy: IMotorPolicy
  document?: IPolicyDocument
  navigation: IReactNavigationProp
}

class PolicyDocumentScreen extends React.Component<IProps> {
  // tslint:disable-next-line:no-unused-variable
  public static navigationOptions = ({ navigation }) => {
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

  public renderDocument() {
    const { document } = this.props
    const name = document ? document.name : ''

    if (document) {
      return <DocumentViewer document={document} />
    }

    return <Spinner text={`Loading ${name}`} />
  }

  public render() {
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

const mapStateToProps = (state: IReduxState) => state

const mergeProps = (state: IReduxState, { dispatch }, ownProps: IProps) => {
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
      navigation: ownProps.navigation,
    }
  }
  throw new Error(`No policy with id ${policyId}`)
}

export default connect(mapStateToProps, null as any, mergeProps)(
  PolicyDocumentScreen as any,
)
