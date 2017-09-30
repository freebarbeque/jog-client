import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import { IReduxState } from '../../../../common/types'

import { RouteComponentProps } from 'react-router'
import { deleteQuoteRequest } from '~/common/store/markets/quoteRequests'
import { BLUE } from '../../../../common/constants/palette'
import {
  IResolvedQuoteRequest,
  selectNormalisedQRs,
} from '../../../../common/store/markets/selectors'
import Container from '../../../components/Container'
import RoundedButton from '../../../components/RoundedButton'

interface IProps
  extends DispatchProp<any>,
    RouteComponentProps<{ policyId?: string }> {
  quoteRequests: { [id: string]: IResolvedQuoteRequest }
}

class QuoteOverviewScreen extends React.Component<IProps> {
  public render() {
    const policyId = this.props.match.params.policyId
    if (!policyId) throw new Error('Overview screen requires policyId')
    const quoteRequest = this.props.quoteRequests[policyId]

    return <Container className="QuoteOverviewScreen" />
  }

  private handleClick = () => {
    this.props.dispatch(
      push(
        `/app/tabs/policies/${this.props.match.params.policyId}/quotes/motor`,
      ),
    )
  }
}

export default connect((state: IReduxState) => ({
  quoteRequests: selectNormalisedQRs(state),
}))(QuoteOverviewScreen)
