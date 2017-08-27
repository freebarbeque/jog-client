import {
  IMotoringIncident,
  MotoringIncidentTypes,
} from 'jog-common/business/types'
import * as React from 'react'
import styled from 'styled-components'
import { BLUE } from '~/common/constants/palette'

import { MARGIN } from '~/common/constants/style'
import RoundedButton from '~/web/components/RoundedButton'

// tslint:disable-next-line:no-var-requires
const moment = require('moment')

interface IProps {
  incidents: IMotoringIncident[]
  onRemovePress: (index: number) => void
}

const Wrapper = styled.div`
  border-width: 1px;
  border-color: rgb(230, 230, 230);
  border-style: solid;

  .Incident {
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

    .Code {
      flex: 1;
    }

    > div {
      padding: ${MARGIN.base}px !important;
    }
  }
`

export default class IncidentTable extends React.Component<IProps> {
  public render() {
    const incidents = this.props.incidents
    return (
      <Wrapper>
        {incidents.map((i, idx) => {
          const code = i.code

          return (
            <div className="Incident" key={`${i.code}-${i.date}`}>
              <div>
                {moment(i.date).format('DD MMM YYYY')}
              </div>
              <div className="Code" style={{ fontWeight: 'bold' }}>
                {code
                  ? MotoringIncidentTypes[code] || code
                  : 'Unknown Incident'}
              </div>
              <div>
                <RoundedButton
                  label="Remove"
                  onClick={() => this.props.onRemovePress(idx)}
                />
              </div>
            </div>
          )
        })}
      </Wrapper>
    )
  }
}
