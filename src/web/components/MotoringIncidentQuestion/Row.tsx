import * as React from 'react'
import styled from 'styled-components'
import { BLUE } from '~/common/constants/palette'
import { MARGIN } from '~/common/constants/style'
import RoundedButton from '~/web/components/RoundedButton'

const RowWrapper = styled.div`
  border-bottom-width: 1px;
  border-bottom-color: rgb(230, 230, 230);
  border-bottom-style: solid;
  color: ${BLUE};
  display: flex;
  flex-direction: row;
  align-items: center;

  &:last-child {
    border-bottom-width: 0;
  }

  .Content {
    flex: 1;
  }

  > div {
    padding: ${MARGIN.base}px !important;
  }
`

interface IProps {
  date: string
  content: any
  onRemovePress: () => void
}

export default class Row extends React.Component<IProps> {
  public render() {
    return (
      <RowWrapper>
        <div>
          {this.props.date}
        </div>
        <div className="Content" style={{ fontWeight: 'bold' }}>
          {this.props.content}
        </div>
        <div>
          <RoundedButton
            label="Remove"
            onClick={() => this.props.onRemovePress()}
          />
        </div>
      </RowWrapper>
    )
  }
}
