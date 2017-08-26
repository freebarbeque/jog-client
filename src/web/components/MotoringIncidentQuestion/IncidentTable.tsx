import { IMotoringIncident } from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'
import { BLUE } from '~/common/constants/palette'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IProps {
  incidents: IMotoringIncident[]
}

const Table = styled.table`
  td {
    color: ${BLUE} !important;
  }
`

export default class IncidentTable extends React.Component<IProps> {
  public render() {
    const incidents = this.props.incidents
    return (
      <Table className="IncidentTable">
        <tbody>
          {incidents.map(i => {
            return (
              <tr className="Incident" key={`${i.code}-${i.date}`}>
                <td>
                  {moment(i.date).format()}
                </td>
                <td>
                  £{i.cost}
                </td>
                <td>
                  £{i.thirdPartyCost}
                </td>
                <td>
                  {i.fault ? 'At Fault' : 'Third Party At Fault'}
                </td>
                <td>
                  {i.personalInjury ? 'Personal Injury' : 'No Personal Injury'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
