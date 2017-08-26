import { IMotoringConviction } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'
import { BLUE } from '~/common/constants/palette'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IProps {
  convictions: IMotoringConviction[]
}

const Table = styled.table`
  td {
    color: ${BLUE} !important;
  }
`

export default class ConvictionTable extends React.Component<IProps> {
  public render() {
    const convictions = this.props.convictions
    return (
      <Table className="ConvictionTable">
        <tbody>
          {convictions.map(conviction => {
            return (
              <tr
                className="Conviction"
                key={`${conviction.code}-${conviction.date}`}
              >
                <td>
                  {moment(conviction.date).format()}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
