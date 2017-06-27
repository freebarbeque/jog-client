/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import Dropzone from 'react-dropzone'

import { BLUE, CREAM, PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { selectPolicies } from '../../common/store/policies/selectors'
import Button from '../components/Button'
import Panel from '../components/Panel'
import PolicyDocumentThumbnail from '../components/PolicyDocumentThumbnail'

import type {
  Dispatch,
  MotorPolicy,
  MotorPolicyMap,
  PolicyDocument,
  ReactNavigationProp,
  ReduxState,
} from '../../common/types'
import { getFile } from '../upload'
import {
  uploadPolicyDocument,
  uploadPolicyDocuments,
} from '../../common/store/policies/actions'

type PolicyDocumentsScreenProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: Dispatch,
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: ReactNavigationProp,
  policies: MotorPolicyMap,
}

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  flex: 1;
  background-color: ${CREAM};
`

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`
  font-size: 16px;
  color: ${BLUE};
  text-align: center;
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const DragDropZone = styled(Dropzone)`
  height: 130px;
  border-style: dashed;
  border-color: rgb(164,169,174);
  border-width: 1px;
  border-radius: 14px;
  font-size: 16px;
  color: rgb(164,169,174);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: ${BLUE};
  }
`

// language=SCSS prefix=dummy{ suffix=}
const BrowseFilesButton = Button.extend`
  height: 64px;
  background-color: rgb(224, 225, 226);
  align-items: center;
  justify-content: center;
  margin-top: ${MARGIN.large}px;
  color: ${BLUE};
  font-size: 16px;
  width: 100%;
`

class PolicyDocumentsScreen extends Component {
  props: PolicyDocumentsScreenProps

  handleBrowseFilesPress = () => {
    getFile().then(file => {
      const policyId = this.props.match.params.policyId

      this.props.dispatch(
        uploadPolicyDocument({
          policyId,
          file,
        }),
      )
    })
  }

  getPolicy(): MotorPolicy | null {
    const policyId = this.props.match.params.policyId
    let policy: MotorPolicy = null

    // Typecheck demanded by Flow
    if (typeof policyId === 'string') {
      policy = this.props.policies[policyId]
    } else {
      throw new TypeError(
        'PolicyDetailsScreen was expecting a policyId of type string in the navigation params.',
      )
    }

    if (!policy && this.props.initialised) {
      throw new Error(
        `Policy with id ${policyId} does not exist so cannot render the policy details screen`,
      )
    }

    return policy
  }

  handleDrop = acceptedFiles => {
    this.props.dispatch(uploadPolicyDocuments(acceptedFiles))
  }

  render() {
    const policy = this.getPolicy()
    const documents = _.values(policy ? policy.documents : [])

    return (
      <Container>
        {!_.isEmpty(documents)
          ? <Panel>
              <Header>Scanned documents</Header>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {documents.map((d: PolicyDocument) => {
                  return (
                    <PolicyDocumentThumbnail
                      key={d.id}
                      document={d}
                      style={{
                        width: `${100 / 3}%`,
                        height: '100%',
                        paddingBottom: MARGIN.large,
                      }}
                      onPress={() => {
                        const params = {
                          documentId: d.id,
                          policyId: policyId,
                          documentName: d.name,
                        }
                        // this.props.dispatch(
                        //   NavigationActions.navigate({
                        //     routeName: 'PolicyDocument',
                        //     params,
                        //   }),
                        // )
                      }}
                    />
                  )
                })}
              </div>
            </Panel>
          : null}
        <Panel>
          <Header>Upload documents</Header>
          <DragDropZone
            onDrop={this.handleDrop}
            activeStyle={{ borderColor: BLUE }}
            rejectStyle={{ borderColor: PINK }}
            accept={['image/*', 'application/pdf']}
          >
            Drag & Drop Files
          </DragDropZone>
          <BrowseFilesButton onClick={this.handleBrowseFilesPress}>
            Browse Files
          </BrowseFilesButton>
        </Panel>
      </Container>
    )
  }
}

const mapStateToProps = (state: ReduxState) => ({
  policies: selectPolicies(state),
})

export default connect(mapStateToProps)(PolicyDocumentsScreen)
