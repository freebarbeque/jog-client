import * as React from 'react'
import styled from 'styled-components'
import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import Row from '~/web/components/MotoringIncidentQuestion/Row'

interface IProps {
  rows: Array<{
    date: string
    content: any
  }>
  onRemovePress: (idx: number) => void
}

const Wrapper = styled.div`
  border-width: 1px;
  border-color: rgb(230, 230, 230);
  border-style: solid;
`

export default class Table extends React.Component<IProps> {
  public render() {
    return (
      <Wrapper>
        {this.props.rows.length
          ? this.props.rows.map((r, i) => {
              return (
                <Row
                  date={r.date}
                  content={r.content}
                  onRemovePress={() => this.props.onRemovePress(i)}
                />
              )
            })
          : <div style={{ padding: MARGIN.base, color: BLUE }}>
              No incidents have been added.
            </div>}
      </Wrapper>
    )
  }
}
