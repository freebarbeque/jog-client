import {
  IMotoringIncident,
  MotoringIncidentTypes,
} from 'jog-common/business/types'
import * as React from 'react'
import Table from '~/web/components/MotoringIncidentQuestion/Table'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IProps {
  incidents: IMotoringIncident[]
  onRemovePress: (index: number) => void
}

export default class IncidentTable extends React.Component<IProps> {
  public render() {
    const incidents = this.props.incidents

    return (
      <Table
        onRemovePress={this.props.onRemovePress}
        rows={incidents.map(i => ({
          date: moment(i.date).format('DD MMM YYYY'),
          content: i.code
            ? MotoringIncidentTypes[i.code] || i.code
            : 'Unknown Incident',
        }))}
      />
    )
  }
}
