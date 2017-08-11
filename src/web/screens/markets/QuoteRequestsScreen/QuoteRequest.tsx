import * as _ from 'lodash'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { push } from 'react-router-redux'
import styled from 'styled-components'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

import { ICar } from 'jog-common/business/types'
import { IReduxState } from '../../../../common/types'

import { Car } from '~/web/components/images'
import { BLUE } from '../../../../common/constants/palette'
import { MARGIN } from '../../../../common/constants/style'
import { INormalQuoteRequest } from '../../../../common/store/markets/selectors'
import Button from '../../../components/Button'
import RoundedButton from '../../../components/RoundedButton'

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  margin-bottom: ${MARGIN.base}px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  * {
    color: ${BLUE};
  }
  padding: ${MARGIN.base}px;
`

const Table = styled.table`margin: ${MARGIN.base};`

const LeftCell = styled.td`
  text-align: left;
  font-weight: bold;
`

const RightCell = styled.td`text-align: right;`

const Link = styled.a`
  color: ${BLUE} !important;
  text-decoration: underline !important;
  margin-top: ${MARGIN.base}px;
  cursor: pointer;

  &:hover {
    text-decoration: none !important;
  }
`

interface IProps {
  quoteRequest: INormalQuoteRequest
  onClick?: () => void
  onDeleteClick?: () => void
}

export default class QuoteRequest extends React.Component<IProps, {}> {
  public render() {
    const quoteRequest = this.props.quoteRequest
    const startDate = quoteRequest.startDate
      ? moment(quoteRequest.startDate)
      : null
    const startDateValid = startDate && startDate.isValid()

    return (
      <Container>
        <div
          style={{
            padding: MARGIN.base,
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Car scale={0.7} />
          <span style={{ marginTop: MARGIN.base / 2 }}>Car Insurance</span>
        </div>
        <div style={{ flex: 1 }}>
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
                  {quoteRequest.normalMainDriver
                    ? quoteRequest.normalMainDriver.description
                    : 'Not Specified'}
                </RightCell>
              </tr>
              <tr>
                <LeftCell>Start Date</LeftCell>
                <RightCell>
                  {startDate && startDateValid
                    ? startDate.format('DD/MM/YYYY')
                    : 'Not Specified'}
                </RightCell>
              </tr>
            </tbody>
          </Table>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <RoundedButton onClick={this.props.onClick} label="Change Details" />
          <Link onClick={this.props.onDeleteClick}>Remove Quote</Link>
        </div>
      </Container>
    )
  }
}
