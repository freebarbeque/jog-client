import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import { ICar } from '../../../../business/types'
import { IReduxState } from '../../../../common/types'

import { BLUE } from '../../../../common/constants/palette'
import { MARGIN } from '../../../../common/constants/style'
import { INormalQuoteRequest } from '../../../../common/store/markets/selectors'
import Button from '../../../components/Button'
import RoundedButton from '../../../components/RoundedButton'

const Container = Button.extend`
  background-color: white;
  display: block;
  margin-bottom: ${MARGIN.base}px;
  width: 100%;
`

const Table = styled.table`margin: ${MARGIN.base};`

const LeftCell = styled.td`
  text-align: left;
  font-weight: bold;
`

const RightCell = styled.td`text-align: right;`

interface IProps {
  quoteRequest: INormalQuoteRequest
  onClick?: () => void
}

export default class QuoteRequest extends React.Component<IProps, {}> {
  public render() {
    const quoteRequest = this.props.quoteRequest

    return (
      <Container onClick={this.props.onClick}>
        <Table>
          <tbody>
            <tr>
              <LeftCell>Car</LeftCell>
              <RightCell>
                {quoteRequest.normalCar
                  ? quoteRequest.normalCar.description
                  : 'Not Specified'}
              </RightCell>
            </tr>
            <tr>
              <LeftCell>Policy Holder</LeftCell>
              <RightCell>
                {quoteRequest.mainDriver || 'Not Specified'}
              </RightCell>
            </tr>
            <tr>
              <LeftCell>Start Date</LeftCell>
              <RightCell>
                {moment(quoteRequest.startDate).format('DD/MM/YYYY')}
              </RightCell>
            </tr>
          </tbody>
        </Table>
      </Container>
    )
  }
}
