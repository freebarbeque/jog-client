import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import styled from 'styled-components'

import { BLUE, PINK } from '../../common/constants/palette'
import { MARGIN } from '../../common/constants/style'
import { selectPolicies } from '../../common/store/policies/selectors'
import Button from '../components/Button'
import Panel from '../components/Panel'
import PolicyDocumentThumbnail from '../components/PolicyDocumentThumbnail'

// tslint:disable-next-line:no-var-requires
const Dropzone = require('react-dropzone')

import { RouteComponentProps } from 'react-router'
import {
  uploadPolicyDocument,
  uploadPolicyDocuments,
} from '../../common/store/policies/actions'
import {
  IMotorPolicy,
  IMotorPolicyMap,
  IPolicyDocument,
  IReduxState,
} from '../../common/types'
import Container from '../components/Container'
import ScrollToTopOnMount from '../components/ScrollToTopOnMount'
import { getFile } from '../upload'

interface IProps extends DispatchProp<any> {
  policies: IMotorPolicyMap
  initialised: boolean
}

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`
  font-size: 16px;
  color: ${BLUE};
  text-align: center;
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const DragDropZone: any = styled(Dropzone)`
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

class PolicyDocumentsScreen extends React.Component<
  IProps & RouteComponentProps<any>
> {
  public render() {
    const policy = this.getPolicy()
    const documents = _.values(policy ? policy.documents : {})

    return (
      <Container style={{ marginTop: MARGIN.large }}>
        <ScrollToTopOnMount />
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
                {documents.map((d: IPolicyDocument) => {
                  return (
                    <PolicyDocumentThumbnail
                      key={d.id}
                      document={d}
                      style={{
                        width: `${100 / 3}%`,
                        height: '100%',
                        paddingBottom: MARGIN.large,
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
            {'Drag & Drop Files'}
          </DragDropZone>
          <BrowseFilesButton onClick={this.handleBrowseFilesPress}>
            Browse Files
          </BrowseFilesButton>
        </Panel>
      </Container>
    )
  }

  private handleBrowseFilesPress = () => {
    getFile().then(file => {
      const match = this.props.match
      const policyId = match.params.policyId

      if (typeof policyId === 'string')
        this.props.dispatch(
          uploadPolicyDocument({
            policyId,
            file,
          }),
        )
      else throw new TypeError('policyId must be of type string')
    })
  }

  private getPolicy(): IMotorPolicy | null {
    const policyId = this.props.match.params.policyId
    let policy: IMotorPolicy | null = null

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

  private handleDrop = acceptedFiles => {
    const policyId = this.props.match.params.policyId

    // Flow type check
    if (typeof policyId === 'string')
      this.props.dispatch(uploadPolicyDocuments(acceptedFiles, policyId))
    else throw new TypeError('policyId must be a string')
  }
}

const mapStateToProps = (state: IReduxState) => ({
  policies: selectPolicies(state),
})

export default connect(mapStateToProps)(PolicyDocumentsScreen)
