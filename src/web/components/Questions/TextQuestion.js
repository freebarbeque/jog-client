// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { TextQuestionDescriptor } from '../../../business/types'
import { BLUE } from '../../../common/constants/palette'
import { MARGIN } from '../../../common/constants/style'
import Number from '../../screens/MarketsScreen/Number'

type TextQuestionProps = {
  descriptor: TextQuestionDescriptor,
  value: string,
  onChange: (value: string) => void,
  error?: string,
  index?: number,
}

// language=SCSS prefix=dummy{ suffix=}
const Header = styled.div`font-size: 16px;`

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  color: ${BLUE};
  display: flex;
  flex-direction: row;
  margin-bottom: ${MARGIN.large}px;
`

// language=SCSS prefix=dummy{ suffix=}
const Input = styled.input`
  margin-top: ${MARGIN.base}px;
  height: 10px;
  padding: ${MARGIN.large}px;
  font-size: 16px;
  background-color: rgb(240, 240, 240);
  border: none;
`

export default class TextQuestion extends Component {
  props: TextQuestionProps

  componentWillMount() {
    const getDefaultValue = this.props.descriptor.defaultValue
    if (getDefaultValue) this.props.onChange(getDefaultValue())
  }

  render() {
    const id = this.props.descriptor.id

    return (
      <Container
        className={`TextQuestion ${id} ${this.props.error ? 'hasError' : ''}`}
      >
        {this.props.index
          ? <div style={{ position: 'relative', bottom: 8, marginRight: 15 }}>
              <Number>
                {this.props.index}
              </Number>
            </div>
          : null}
        <div>
          <Header>
            {this.props.descriptor.questionText}
          </Header>
          <Input
            value={this.props.value}
            name={id}
            onChange={e => this.props.onChange(id, e.target.value)}
          />
        </div>
      </Container>
    )
  }
}
