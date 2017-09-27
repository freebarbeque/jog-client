import {
  constructConviction,
  IMotoringConvictionAnswer,
} from 'jog-common/business/motoringConvictions'
import { MotoringConvictionType } from 'jog-common/business/types'
import * as React from 'react'
import Table from '~/web/components/MotoringIncidentQuestion/Table'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IProps {
  convictions: IMotoringConvictionAnswer[]
  onRemovePress: (index: number) => void
}

export default class ConvictionTable extends React.Component<IProps> {
  public render() {
    const convictionAnswers = this.props.convictions
    const convictions = convictionAnswers.map(c => constructConviction(c))

    return (
      <Table
        onRemovePress={this.props.onRemovePress}
        rows={convictions.map(c => ({
          date: moment(c.date).format('DD MMM YYYY'),
          content: c.code
            ? MotoringConvictionType[c.code] || c.code
            : 'Unknown Conviction',
        }))}
      />
    )
  }
}
