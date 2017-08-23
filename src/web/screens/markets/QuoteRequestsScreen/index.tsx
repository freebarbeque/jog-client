import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

// tslint:disable-next-line:no-var-requires
const uuid = require('uuid/v4')

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import { IReduxState } from '../../../../common/types'

import { deleteQuoteRequest } from '~/common/store/markets/quoteRequests'
import { BLUE } from '../../../../common/constants/palette'
import {
  INormalQuoteRequest,
  selectNormalisedQRs,
} from '../../../../common/store/markets/selectors'
import RoundedButton from '../../../components/RoundedButton'
import QuoteRequest from './QuoteRequest'

interface IProps extends DispatchProp<any> {
  quoteRequests: { [id: string]: INormalQuoteRequest }
}

const Container = styled.div`
  p {
    color: ${BLUE} !important;
  }
`

class QuoteRequestsScreen extends React.Component<IProps> {
  public render() {
    const quoteRequests = _.chain(this.props.quoteRequests)
      .sortBy(q => moment(q.lastUpdated).toDate())
      .reverse()
      .value()
    const numRequests = _.keys(quoteRequests).length

    return (
      <Container className="QuoteRequestsScreen">
        <p>
          You have {numRequests} ongoing quote request{numRequests === 1 ? '' : 's'}.
        </p>
        {_.values(quoteRequests).map(q =>
          <QuoteRequest
            quoteRequest={q}
            onDeleteClick={() => {
              if (q.id) {
                this.props.dispatch(deleteQuoteRequest(q.id))
              } else {
                throw new Error('All quotes should have an id')
              }
            }}
            onClick={() =>
              this.props.dispatch(push(`/app/tabs/markets/motor/${q.id}`))}
          />,
        )}
        <RoundedButton
          onClick={this.handleClick}
          label="New Quote"
          style={{ color: 'white' }}
        />
      </Container>
    )
  }

  private handleClick = () => {
    this.props.dispatch(push(`/app/tabs/markets/motor/${uuid()}`))
  }
}

export default connect((state: IReduxState) => ({
  quoteRequests: selectNormalisedQRs(state),
}))(QuoteRequestsScreen)
