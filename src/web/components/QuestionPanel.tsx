import * as React from 'react'
import styled from 'styled-components'
import { MARGIN } from '~/common/constants/style'
import Panel from './Panel'

const Container = Panel.extend`
  max-width: 462px;
  padding-left: 80px;
  padding-right: 80px;
`

const Header = styled.div`
  color: #13293d;
  font-size: 24px;
  font-weight: 600;
  margin-top: ${MARGIN.large}px;
`

interface IProps {
  title?: string
}

export default class QuestionPanel extends React.Component<IProps> {
  public render() {
    return (
      <div className="QuestionPanel">
        {this.props.title
          ? <Header>
              {this.props.title}
            </Header>
          : null}
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
