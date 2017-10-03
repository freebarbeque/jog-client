import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { IReduxState } from '../../../../common/types'

import { RouteComponentProps } from 'react-router'
import {
  IResolvedQuoteRequest,
  selectNormalisedQRs,
} from '../../../../common/store/markets/selectors'
import Container from '../../../components/Container'

interface IProps
  extends DispatchProp<any>,
    RouteComponentProps<{ policyId?: string }> {
  quoteRequests: { [id: string]: IResolvedQuoteRequest }
}

class QuoteOverviewScreen extends React.Component<IProps> {
  public render() {
    const policyId = this.props.match.params.policyId
    if (!policyId) throw new Error('Overview screen requires policyId')

    return <Container className="QuoteOverviewScreen" />
  }
}

export default connect((state: IReduxState) => ({
  quoteRequests: selectNormalisedQRs(state),
}))(QuoteOverviewScreen)
